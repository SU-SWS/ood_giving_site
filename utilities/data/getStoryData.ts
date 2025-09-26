import type { getStoryDataProps } from '@/utilities/data/types';
import { type ISbStoriesParams, type ISbResult } from '@storyblok/react/rsc';
import { unstable_cache } from 'next/cache';
import { resolveRelations } from '@/utilities/resolveRelations';
import { getStoryblokClient } from '@/utilities/storyblok';

/**
 * Get the data out of the Storyblok API for the page.
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
    throw error;
  }
};

/**
 * Get the data out of the Storyblok API for the page through the cache.
 */
export const getStoryDataCached = unstable_cache(
  getStoryData,
  ['story-data'], // Proper cache key
  {
    tags: ['story', 'page'],
    // Cache for 10 minutes to balance freshness with performance
    revalidate: 600,
  },
);
