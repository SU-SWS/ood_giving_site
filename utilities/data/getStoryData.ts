import type { getStoryDataProps } from '@/utilities/data/types';
import { type ISbStoriesParams, type ISbResult } from '@storyblok/react/rsc';
import { cache } from 'react';
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
 * - Uses `cache: 'no-store'` in customFetch to ensure fresh content per build
 * - Wrapped by `cache` function for build-time deduplication
 * - No post-build revalidation (static-first with webhook-triggered rebuilds)
 */
export const getStoryData = async ({ path }: getStoryDataProps): Promise<ISbResult | { data: 404 }> => {
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error && error.status && error.status === 404) {
      return { data: 404 };
    }
    logError('Failed to fetch story from Storyblok API', error, { path, status: error?.status });
    throw error;
  }
};

/**
 * Get the data out of the Storyblok API for the page through the cache.
 *
 * Uses React's `cache` function for build-time deduplication.
 * The cache is scoped to a single build process - each new build fetches fresh content.
 * This prevents redundant API calls when the same story is requested multiple times
 * during static generation (e.g., by generateStaticParams and page rendering).
 *
 * Cache keys are automatically derived from function arguments by React.
 */
export const getStoryDataCached = cache(getStoryData);
