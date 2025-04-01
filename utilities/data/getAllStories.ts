import { type ISbStoriesParams } from '@storyblok/react/rsc';
import { isProduction } from '@/utilities/getActiveEnv';
import { unstable_cache } from 'next/cache';
import { getStoryblokApi } from '@/utilities/storyblok';

/**
 * Fetches all stories from Storyblok.
 */
export const getAllStories = async () => {
  const isProd = isProduction();
  // Fetch new content from storyblok.
  const storyblokApi = getStoryblokApi();

  const sbParams: ISbStoriesParams = {
    version: isProd ? 'published' : 'draft',
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
