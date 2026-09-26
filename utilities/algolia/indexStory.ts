import { type ISbResult, type ISbStoriesParams } from '@storyblok/react/rsc';
import { algoliasearch } from 'algoliasearch';
import { getStoryblokClient } from '@/utilities/storyblok';
import { logError, logInfo, logWarn } from '@/utilities/logger';
import { transformStoryblokRecord } from './transformStoryblokRecord';
import {
  type AlgoliaSearchRecord,
  type IndexStoryParams,
  type StoryblokWebhookAction,
} from './types';

const MAIN_INDEX_NAME = process.env.ALGOLIA_INDEX_NAME
  || process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME
  || 'Giving To Stanford (ISR)';

const STORYBLOK_PARAMS: ISbStoriesParams = {
  version: 'published',
  resolve_links: 'url',
};

/**
 * Promise-based delay utility for retry backoff.
 */
const sleep = (ms: number) => new Promise((resolve) => {
  setTimeout(resolve, ms);
});

/**
 * Executes an async operation with exponential backoff retries.
 */
const withRetry = async <T>(
  fn: () => Promise<T>,
  label: string,
  maxAttempts = 3,
): Promise<T> => {
  let attempt = 1;

  while (attempt <= maxAttempts) {
    try {
      return await fn();
    } catch (error) {
      if (attempt === maxAttempts) {
        throw error;
      }

      const backoffMs = 250 * (2 ** (attempt - 1));
      logWarn(`[Algolia Indexing] ${label} failed; retrying`, { attempt, backoffMs });
      await sleep(backoffMs);
      attempt += 1;
    }
  }

  throw new Error(`[Algolia Indexing] Exhausted retries for ${label}`);
};

/**
 * Initializes Algolia client using admin credentials.
 */
const getClients = () => {
  const appID = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || '';
  const adminKey = process.env.ALGOLIA_ADMIN_KEY || '';

  if (!appID || !adminKey) {
    throw new Error('Missing Algolia credentials: NEXT_PUBLIC_ALGOLIA_APP_ID and/or ALGOLIA_ADMIN_KEY');
  }

  return algoliasearch(appID, adminKey);
};

/**
 * Fetches the latest published Storyblok story by full slug.
 * Returns null when the story no longer exists.
 */
const getStory = async (slug: string): Promise<ISbResult | null> => {
  const storyblokApi = getStoryblokClient();

  try {
    return await storyblokApi.get(`cdn/stories/${slug}`, STORYBLOK_PARAMS);
  } catch (error) {
    const err = error as { status?: number };
    if (err?.status === 404) {
      return null;
    }

    throw error;
  }
};

/**
 * Deletes a record from the primary search index.
 */
const deleteFromIndexes = async (slug: string) => {
  const client = getClients();

  await withRetry(async () => {
    await client.deleteObject({
      indexName: MAIN_INDEX_NAME,
      objectID: slug,
    });
  }, `delete slug ${slug}`);

  logInfo('[Algolia Indexing] Deleted record from main index', {
    slug,
    mainIndex: MAIN_INDEX_NAME,
  });
};

/**
 * Saves a transformed record to the main index.
 */
const saveToIndexes = async (record: AlgoliaSearchRecord) => {
  const client = getClients();

  await withRetry(async () => {
    await client.saveObjects({
      indexName: MAIN_INDEX_NAME,
      objects: [record],
    });
  }, `save slug ${record.objectID}`);

  logInfo('[Algolia Indexing] Saved record to main index', {
    objectID: record.objectID,
    mainIndex: MAIN_INDEX_NAME,
  });
};

/**
 * Handles publish-like behavior by fetching, transforming, and upserting a story.
 * If the fetched story is missing or filtered, existing records are removed.
 */
const handlePublished = async (slug: string) => {
  const storyResult = await getStory(slug);
  if (!storyResult?.data?.story) {
    await deleteFromIndexes(slug);
    return;
  }

  const transformed = transformStoryblokRecord(storyResult.data.story);
  if (!transformed) {
    await deleteFromIndexes(slug);
    return;
  }

  await saveToIndexes(transformed);
};

/**
 * Placeholder normalization to keep event parsing explicit and centralized.
 */
const normalizeAction = (action: StoryblokWebhookAction): StoryblokWebhookAction => {
  return action;
};

/**
 * Coordinates Algolia index updates for supported Storyblok webhook actions.
 */
export const indexStory = async ({ action, fullSlug, oldFullSlug }: IndexStoryParams) => {
  const normalizedAction = normalizeAction(action);
  const slug = (fullSlug || '').trim();
  const oldSlug = (oldFullSlug || '').trim();

  try {
    switch (normalizedAction) {
      case 'story.deleted':
      case 'story.unpublished': {
        if (!slug) {
          logWarn('[Algolia Indexing] Missing full slug for delete/unpublish event', { action });
          return;
        }

        await deleteFromIndexes(slug);
        return;
      }

      case 'story.moved': {
        if (oldSlug) {
          await deleteFromIndexes(oldSlug);
        }

        if (!slug) {
          logWarn('[Algolia Indexing] Missing new full slug for moved event', { action, oldSlug });
          return;
        }

        await handlePublished(slug);
        return;
      }

      case 'story.published': {
        if (!slug) {
          logWarn('[Algolia Indexing] Missing full slug for publish event', { action });
          return;
        }

        await handlePublished(slug);
        return;
      }

      default:
        logWarn('[Algolia Indexing] Unsupported action', { action: normalizedAction });
    }
  } catch (error) {
    logError('[Algolia Indexing] Failed to process webhook action', error, {
      action: normalizedAction,
      fullSlug: slug,
      oldFullSlug: oldSlug,
    });
  }
};
