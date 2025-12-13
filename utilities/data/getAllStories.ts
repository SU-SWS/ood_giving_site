import { type ISbStoriesParams } from '@storyblok/react/rsc';
import { getStoryblokClient } from '@/utilities/storyblok';
import { logError, logDebug } from '@/utilities/logger';

/**
 * Fetches all stories from Storyblok.
 *
 * **Version Strategy (Next.js 16)**:
 * - Production builds: Always fetches `version: 'published'` content
 * - Used by generateStaticParams for static page generation
 * - Visual editor bypasses this via client-side draft fetching
 *
 * **Caching Strategy**:
 * - Uses Next.js 16's `use cache` directive for automatic caching
 * - Storyblok SDK uses built-in memory cache with automatic clearing
 * - Cache entries are stored in-memory and respect the default cacheLife profile
 * - Uses `cdn/links` endpoint for efficient slug retrieval without full content
 *
 * **Error Handling**:
 * - Storyblok SDK handles retries internally
 * - Logs errors for debugging and monitoring
 * - Re-throws to fail the build loudly on persistent errors
 */
export const getAllStories = async () => {
  'use cache';

  const storyblokApi = getStoryblokClient();

  const sbParams: ISbStoriesParams = {
    // We have separate dev/prod spaces; we only ever want published stories.
    version: 'published',
    resolve_links: '0',
    resolve_assets: 0,
    // Let Storyblok handle cache invalidation automatically
  };

  try {
    logDebug('Fetching all stories from Storyblok');

    // Use the `cdn/links` endpoint to get a list of all stories without all the extra data.
    const response = await storyblokApi.getAll('cdn/links', sbParams);

    logDebug('All stories fetched successfully', {
      count: response?.length ?? 0,
    });

    return response;
  } catch (error: unknown) {
    logError('Failed to fetch all stories from Storyblok API', error);
    throw error;
  }
};
