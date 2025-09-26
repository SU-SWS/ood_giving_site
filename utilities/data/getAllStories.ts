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
 * Long cache duration for edge caching, but uses build timestamp for fresh builds.
 */
export const getAllStoriesCached = unstable_cache(
  getAllStories,
  [],
  {
    tags: ['story', 'all'],
    revalidate: 604800, // Revalidate every 7 days for better edge caching
  },
);

/**
 * Get all stories with build-time cache busting for fresh builds.
 * This ensures generateStaticParams always gets the latest content during builds.
 */
export const getAllStoriesForBuild = unstable_cache(
  getAllStories,
  [`build-${Date.now()}`], // Cache key includes timestamp to ensure fresh builds
  {
    tags: ['story', 'all', 'build'],
    revalidate: false, // No revalidation - fresh for each build
  },
);
