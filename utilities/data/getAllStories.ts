import { type ISbStoriesParams } from '@storyblok/react/rsc';
import { cache } from 'react';
import { getStoryblokClient } from '@/utilities/storyblok';

/**
 * Fetches all stories from Storyblok.
 *
 * **Version Strategy (Next.js 16)**:
 * - Production builds: Always fetches `version: 'published'` content
 * - Used by generateStaticParams for static page generation
 * - Visual editor bypasses this via client-side draft fetching
 *
 * **Caching Strategy**:
 * - Uses `cache: 'no-store'` in customFetch to ensure fresh content per build
 * - Wrapped by `cache` function for build-time deduplication
 * - Uses `cdn/links` endpoint for efficient slug retrieval without full content
 */
export const getAllStories = async () => {
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
  const response = await storyblokApi.getAll('cdn/links', sbParams);

  return response;
};

/**
 * Get all stories from Storyblok through the cache.
 *
 * Uses React's `cache` function for build-time deduplication.
 * This ensures all static pages are generated with consistent, fresh content
 * from a single set of API calls per build.
 *
 * Cache keys are automatically derived from function arguments by React.
 */
export const getAllStoriesCached = cache(getAllStories);
