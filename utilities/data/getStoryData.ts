import type { getStoryDataProps } from '@/utilities/data/types';
import { type ISbStoriesParams, type ISbResult } from '@storyblok/react/rsc';
import { resolveRelations } from '@/utilities/resolveRelations';
import { isProduction } from '@/utilities/getActiveEnv';
import { unstable_cache } from 'next/cache';
import { getStoryblokClient } from '@/utilities/storyblok';

/**
 * Get the data out of the Storyblok API for the page.
 */
export const getStoryData = async ({
  path,
  isEditor = false,
}: getStoryDataProps): Promise<ISbResult | { data: 404 }> => {
    const storyblokApi = getStoryblokClient({ isEditor });
    const isProd = isProduction();

    const sbParams: ISbStoriesParams = {
      version: isProd && !isEditor ? 'published' : 'draft',
      cv: isEditor ? Date.now() : undefined,
      resolve_relations: resolveRelations,
      resolve_links: 'url',
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
  [],
  {
    tags: ['story', 'page'],
  },
);
