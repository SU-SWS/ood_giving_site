import type { getStoryDataProps } from '@/utilities/data/types';
import { type ISbStoriesParams, type ISbResult } from '@storyblok/react/rsc';
import { resolveRelations } from '@/utilities/resolveRelations';
import { getStoryblokClient } from '@/utilities/storyblok';
import { logError, logDebug } from '@/utilities/logger';

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
 * **Error Handling**:
 * - Storyblok SDK handles retries internally
 * - Returns { data: 404 } for not found responses
 * - Re-throws other errors for error boundary handling
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

  logDebug('Fetching story from Storyblok', { slug });

  try {
    const story: ISbResult = await storyblokApi.get(`cdn/stories/${slug}`, sbParams);

    logDebug('Story fetched successfully', {
      slug,
      storyName: story?.data?.story?.name,
      storyUuid: story?.data?.story?.uuid,
    });

    return story;
  } catch (error: unknown) {
    const err = error as { status?: number };

    // Handle 404 gracefully
    if (err?.status === 404) {
      return { data: 404 };
    }

    // Log and re-throw other errors for error boundary handling
    logError('Failed to fetch story from Storyblok API', error, { path, status: err?.status });
    throw error;
  }
};
