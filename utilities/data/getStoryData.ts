import type { getStoryDataProps } from '@/utilities/data/types';
import { type ISbStoriesParams, type ISbResult } from '@storyblok/react/rsc';
import { resolveRelations } from '@/utilities/resolveRelations';
import { getStoryblokClient } from '@/utilities/storyblok';
import { logError } from '@/utilities/logger';

/**
 * Get the data out of the Storyblok API for the page.
 *
 * **Version Strategy (Next.js 16)**:
 * - Production builds: Always fetches `version: 'published'` content
 * - Visual editor: Uses `version: 'draft'` (handled in EditorClient.tsx client-side)
 * - Separate dev/prod Storyblok spaces ensure correct content per environment
 *
 * **Caching Strategy**:
 * - Uses Next.js 16's `use cache` directive for automatic caching
 * - Storyblok SDK uses built-in memory cache with automatic clearing
 * - Cache entries are stored in-memory and respect the default cacheLife profile
 * - No post-build revalidation (static-first with webhook-triggered rebuilds)
 *
 * **Error Handling Strategy (Stale-While-Revalidate Protection)**:
 * - **404 errors**: Returns `{ data: 404 }` - safe to cache, content genuinely missing
 * - **Network/transient errors**: Re-throws the error - this is CRITICAL!
 *
 * By re-throwing network errors, Next.js/Netlify will:
 * 1. NOT update the cache with a broken response
 * 2. Continue serving the previously cached version (SWR)
 * 3. Retry the fetch on the next request
 *
 * DO NOT catch and return fallback data for network errors - this would cache
 * the broken state and replace the good cached content!
 */
export const getStoryData = async ({ path }: getStoryDataProps): Promise<ISbResult | { data: 404 }> => {
  'use cache';

  const storyblokApi = getStoryblokClient();

  const sbParams: ISbStoriesParams = {
    // We have separate dev/prod spaces; we only ever want published stories outside of the live editor.
    version: 'published',
    resolve_relations: resolveRelations,
    resolve_links: 'url',
    // Let Storyblok handle cache invalidation automatically
  };

  const slug = path.replace(/\/$/, ''); // Remove trailing slash.

  try {
    const story: ISbResult = await storyblokApi.get(`cdn/stories/${slug}`, sbParams);
    return story;

  } catch (error: any) {
    // 404 is an expected case - content genuinely doesn't exist
    // Safe to return and cache this state
    if (error && error.status && error.status === 404) {
      return { data: 404 };
    }

    // For ALL other errors (network issues, timeouts, 5xx, etc.):
    // Log the error for debugging, then RE-THROW to preserve the SWR cache.
    // This prevents broken responses from being cached.
    logError('Failed to fetch story from Storyblok API', error, { path, status: error?.status });
    throw error;
  }
};
