import { isProduction } from '@/utilities/getActiveEnv';
import { unstable_cache } from 'next/cache';
import { getStoryblokApi } from '@/utilities/storyblok';

/**
 * Get the global configuration from Storyblok.
 */
export const getConfigBlok = async () => {
  const storyblokApi = getStoryblokApi();
  const isProd = isProduction();

  // TODO: Add a config block
  return {};

  // Get the global configuration.
  const { data: { story: config } } = await storyblokApi.get(
    'cdn/stories/global-components/configuration/site-configuration',
    {
      version: isProd ? 'published' : 'draft',
      token: process.env.STORYBLOK_ACCESS_TOKEN,
    },
  );

  return config;
};

/**
 * Get the global configuration from Storyblok through the cache.
 */
export const getConfigBlokCached = unstable_cache(
  getConfigBlok,
  ['site-configuration'],
  {
    tags: ['global', 'config'],
  },
);
