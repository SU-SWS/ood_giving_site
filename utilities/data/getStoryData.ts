import type { getStoryDataProps } from '@/utilities/data/types';
import type { ISbStoriesParams, ISbResult } from '@storyblok/react';
import { resolveRelations } from '@/utilities/resolveRelations';
import { isProduction } from '../getActiveEnv';
import { unstable_cache } from 'next/cache';
import { getStoryblokApi } from '@/utilities/storyblok';

/**
 * Get the data out of the Storyblok API for the page.
 */
export const getStoryData =
  async ({ path, isEditor = false }: getStoryDataProps): Promise<ISbResult | { data: 404 }> => {
    const storyblokApi = getStoryblokApi();
    const isProd = isProduction();

    const sbParams: ISbStoriesParams = {
      version: isProd && !isEditor ? 'published' : 'draft',
      cv: isEditor ? Date.now() : undefined,
      resolve_relations: resolveRelations,
      token: isEditor ? process.env.STORYBLOK_PREVIEW_EDITOR_TOKEN : process.env.STORYBLOK_ACCESS_TOKEN,
    };

    const slug = path.replace(/\/$/, ''); // Remove trailing slash.

    console.log('GET STORY: ', slug);

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
  [],
  {
    tags: ['story', 'page'],
  },
);
