import { type ISbStoriesParams } from '@storyblok/react/rsc';
import { getStoryblokClient } from '@/utilities/storyblok';
import { logError } from '@/utilities/logger';

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
 */
export const getAllStories = async () => {
  'use cache';

  // Fetch new content from storyblok.
  const storyblokApi = getStoryblokClient();

  const sbParams: ISbStoriesParams = {
    // We have separate dev/prod spaces; we only ever want published stories.
    version: 'published',
    resolve_links: '0',
    resolve_assets: 0,
    // Let Storyblok handle cache invalidation automatically
  };

  // Use the `cdn/links` endpoint to get a list of all stories without all the extra data.
  try {
    const response = await storyblokApi.getAll('cdn/links', sbParams);
    return response;
  } catch (error: any) {
    logError('Failed to fetch all stories from Storyblok', error, {
      endpoint: 'cdn/links',
      status: error?.status,
    });
    throw error; // Re-throw to prevent caching broken state
  }
};
