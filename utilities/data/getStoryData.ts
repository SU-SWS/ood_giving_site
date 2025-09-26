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
 * Uses long cache duration (7 days) for optimal edge caching between builds.
 */
export const getStoryDataCached = unstable_cache(
  getStoryData,
  [],
  {
    tags: ['story', 'page'],
    revalidate: 604800, // Revalidate every 7 days for better edge caching
  },
);

/**
 * Get story data with build-time cache busting for fresh builds.
 * This ensures generateMetadata and page rendering get the latest content during builds.
 */
export const getStoryDataForBuild = (path: string) => unstable_cache(
  getStoryData,
  [`build-${Date.now()}-${path}`], // Cache key includes timestamp and path for fresh builds
  {
    tags: ['story', 'page', 'build'],
    revalidate: false, // No revalidation - fresh for each build
  },
)({ path });

/**
 * Get story data with appropriate caching strategy.
 * Uses build-specific caching during static generation, regular caching during runtime.
 */
export const getStoryDataSmart = async ({ path }: getStoryDataProps) => {
  // Check if we're in a Netlify build context using Netlify-specific environment variables
  // NETLIFY is always true during builds, but is not available at runtime
  const isBuildTime = process.env.NETLIFY === 'true';

  if (isBuildTime) {
    return getStoryDataForBuild(path);
  }

  return getStoryDataCached({ path });
};
