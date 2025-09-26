import { type ISbStoriesParams } from '@storyblok/react/rsc';
import { unstable_cache } from 'next/cache';
import { getStoryblokClient } from '@/utilities/storyblok';

/**
 * Fetches all stories from Storyblok.
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
 */
export const getAllStoriesCached = unstable_cache(
  getAllStories,
  ['all-stories'], // Proper cache key
  {
    tags: ['story', 'all'],
    // Cache for 10 minutes to balance freshness with performance
    revalidate: 600,
  },
);
