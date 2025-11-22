import { type ISbStoriesParams } from '@storyblok/react/rsc';
import { unstable_cache } from 'next/cache';
import { getStoryblokClient } from '@/utilities/storyblok';

const BUILD_ID = process.env.BUILD_ID || '';

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
 * The actual cached function
 */
const cachedGetAllStories = unstable_cache(
  getAllStories,
  ['all-stories', BUILD_ID], // Proper cache key with BUILD_ID for fresh content per build
  {
    tags: ['story', 'all'],
    // Cache for 10 minutes to balance freshness with performance
    revalidate: 600,
  },
);

/**
 * Get all stories from Storyblok through the cache.
 * This wrapper adds logging to track cache hits/misses.
 */
export const getAllStoriesCached = async () => {
  const cacheKey = `all-stories:${BUILD_ID}`;
  const startTime = Date.now();

  console.log(`[CACHE CHECK] getAllStories - Checking unstable_cache (key: ${cacheKey})`);
  console.log(`[CACHE INFO] getAllStories - BUILD_ID: ${BUILD_ID}, revalidate: 600s, tags: story,all`);

  const result = await cachedGetAllStories();

  const duration = Date.now() - startTime;
  console.log(`[CACHE RESULT] getAllStories - unstable_cache returned in ${duration}ms`);

  if (duration < 10) {
    console.log(`[CACHE HIT LIKELY] getAllStories - Fast return suggests cached data was used`);
  } else {
    console.log(`[CACHE MISS LIKELY] getAllStories - Slow return suggests function executed`);
  }

  return result;
};
