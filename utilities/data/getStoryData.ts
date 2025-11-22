import type { getStoryDataProps } from '@/utilities/data/types';
import { type ISbStoriesParams, type ISbResult } from '@storyblok/react/rsc';
import { unstable_cache } from 'next/cache';
import { resolveRelations } from '@/utilities/resolveRelations';
import { getStoryblokClient } from '@/utilities/storyblok';

const BUILD_ID = process.env.BUILD_ID || '';

// Track function execution for cache debugging
let executionCounter = 0;

/**
 * Get the data out of the Storyblok API for the page.
 * This function is the actual implementation that gets cached.
 */
export const getStoryData = async ({ path }: getStoryDataProps): Promise<ISbResult | { data: 404 }> => {
  const execId = ++executionCounter;
  console.log(`[CACHE EXEC ${execId}] ${path} - getStoryData function EXECUTING (cache miss or first call)`);
  console.log(`[5a. STORYBLOK API] ${path} - Getting Storyblok client`);
  const storyblokApi = getStoryblokClient();
  console.log(`[6. STORYBLOK API] ${path} - Client obtained, making API request`);

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
    console.log(`[7. STORYBLOK API] ${path} - API request successful, story ID: ${story.data?.story?.id || 'unknown'}`);
    console.log(`[CACHE EXEC ${execId}] ${path} - getStoryData function COMPLETED`);
    return story;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error && error.status && error.status === 404) {
      console.log(`[7. STORYBLOK API] ${path} - Story not found (404)`);
      console.log(`[CACHE EXEC ${execId}] ${path} - getStoryData function COMPLETED (404)`);
      return { data: 404 };
    }
    console.error(`[7. STORYBLOK API ERROR] ${path} - Error fetching story:`, error.message || error);
    console.error(`[CACHE EXEC ${execId}] ${path} - getStoryData function FAILED`);
    throw error;
  }
};

/**
 * The actual cached function - this is what unstable_cache wraps
 */
const cachedGetStoryData = unstable_cache(
  getStoryData,
  ['story-data', BUILD_ID], // Include BUILD_ID for fresh content per build
  {
    tags: ['story', 'page'],
    // Cache for 10 minutes to balance freshness with performance
    revalidate: 600,
  },
);

/**
 * Get the data out of the Storyblok API for the page through the cache.
 * This wrapper adds logging to track cache hits/misses.
 */
export const getStoryDataCached = async (props: getStoryDataProps): Promise<ISbResult | { data: 404 }> => {
  const { path } = props;
  const cacheKey = `story-data:${BUILD_ID}:${path}`;
  const startTime = Date.now();

  console.log(`[CACHE CHECK] ${path} - Checking unstable_cache (key: ${cacheKey})`);
  console.log(`[CACHE INFO] ${path} - BUILD_ID: ${BUILD_ID}, revalidate: 600s, tags: story,page`);

  const result = await cachedGetStoryData(props);

  const duration = Date.now() - startTime;
  console.log(`[CACHE RESULT] ${path} - unstable_cache returned in ${duration}ms`);

  // If the duration is very short (<10ms), it's likely a cache hit
  // If it's longer, the function probably executed (cache miss)
  if (duration < 10) {
    console.log(`[CACHE HIT LIKELY] ${path} - Fast return suggests cached data was used`);
  } else {
    console.log(`[CACHE MISS LIKELY] ${path} - Slow return suggests function executed`);
  }

  return result;
};
