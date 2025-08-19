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
    // Always grab the latest stories.
    cv: Date.now(),
    resolve_links: '0',
    resolve_assets: 0,
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
  [],
  {
    tags: ['story', 'all'],
  },
);
