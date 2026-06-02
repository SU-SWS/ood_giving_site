import crypto from 'crypto';
import dotenv from 'dotenv';
import { indexStory } from '@/utilities/algolia/indexStory';
import { logError, logInfo, logWarn } from '@/utilities/logger';
import { type StoryblokWebhookAction } from '@/utilities/algolia/types';

dotenv.config();

const ACTIONS: StoryblokWebhookAction[] = [
  'story.deleted',
  'story.moved',
  'story.published',
  'story.unpublished',
];

type StoryblokWebhookPayload = {
  action?: string;
  full_slug?: string;
  old_full_slug?: string;
  story_id?: number;
};

/**
 * Constant-time string comparison to reduce signature timing attack risk.
 */
const safeEqual = (left: string, right: string): boolean => {
  const leftBuffer = Buffer.from(left, 'utf8');
  const rightBuffer = Buffer.from(right, 'utf8');

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(leftBuffer, rightBuffer);
};

/**
 * Builds accepted HMAC digests for Storyblok signature verification.
 * Supports both SHA-1 and SHA-256 digest lengths for compatibility.
 */
const getExpectedSignatures = (body: string, secret: string): string[] => {
  const sha1 = crypto.createHmac('sha1', secret).update(body).digest('hex');
  const sha256 = crypto.createHmac('sha256', secret).update(body).digest('hex');
  return [sha1, sha256];
};

/**
 * Validates the webhook signature against accepted digest algorithms.
 */
const isSignatureValid = (body: string, signature: string, secret: string): boolean => {
  if (!signature || !secret) {
    return false;
  }

  return getExpectedSignatures(body, secret).some((expected) => safeEqual(expected, signature));
};

/**
 * Normalizes webhook topic/action values into supported internal action types.
 */
const normalizeAction = (topicHeader: string, action?: string): StoryblokWebhookAction | null => {
  const topic = topicHeader.trim().toLowerCase();
  if (ACTIONS.includes(topic as StoryblokWebhookAction)) {
    return topic as StoryblokWebhookAction;
  }

  const fallback = action?.trim().toLowerCase();
  if (!fallback) {
    return null;
  }

  const prefixed = fallback.startsWith('story.') ? fallback : `story.${fallback}`;
  return ACTIONS.includes(prefixed as StoryblokWebhookAction)
    ? prefixed as StoryblokWebhookAction
    : null;
};

/**
 * Small JSON response helper for consistent function responses.
 */
const jsonResponse = (status: number, body: Record<string, unknown>) => {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json',
    },
  });
};

/**
 * Netlify webhook handler that validates Storyblok signatures and dispatches
 * indexing operations asynchronously.
 */
const storyblokWebhook = async (request: Request) => {
  if (request.method !== 'POST') {
    return jsonResponse(405, { error: 'Method not allowed' });
  }

  const rawBody = await request.text();
  const signature = request.headers.get('webhook-signature') || '';
  const topic = request.headers.get('x-storyblok-topic') || '';
  const secret = process.env.STORYBLOK_WEBHOOK_SECRET || '';

  if (!secret) {
    logError('[Storyblok Webhook] Missing STORYBLOK_WEBHOOK_SECRET');
    return jsonResponse(500, { error: 'Webhook secret not configured' });
  }

  if (!isSignatureValid(rawBody, signature, secret)) {
    logWarn('[Storyblok Webhook] Signature validation failed', { topic });
    return jsonResponse(403, { error: 'Invalid webhook signature' });
  }

  let payload: StoryblokWebhookPayload;
  try {
    payload = JSON.parse(rawBody) as StoryblokWebhookPayload;
  } catch (error) {
    logError('[Storyblok Webhook] Invalid JSON payload', error);
    return jsonResponse(400, { error: 'Invalid JSON payload' });
  }

  // Ignore unsupported actions to keep the endpoint tolerant to extra webhook topics.
  const normalizedAction = normalizeAction(topic, payload.action);
  if (!normalizedAction) {
    logWarn('[Storyblok Webhook] Unsupported action', { topic, action: payload.action });
    return jsonResponse(200, { ok: true, ignored: true });
  }

  const fullSlug = payload.full_slug || null;
  const oldFullSlug = payload.old_full_slug || null;

  logInfo('[Storyblok Webhook] Received action', {
    action: normalizedAction,
    storyId: payload.story_id,
    fullSlug,
    oldFullSlug,
  });

  // Fire-and-forget indexing so webhook responses return quickly.
  void indexStory({
    action: normalizedAction,
    fullSlug,
    oldFullSlug,
  }).catch((error) => {
    logError('[Storyblok Webhook] Background indexing task failed', error, {
      action: normalizedAction,
      fullSlug,
      oldFullSlug,
    });
  });

  return jsonResponse(200, { ok: true });
};

export default storyblokWebhook;
