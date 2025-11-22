import { unstable_cache } from 'next/cache';
import { type SbCtaLinkProps } from '@/components/Storyblok/SbCtaLink';
import { getStoryblokClient } from '@/utilities/storyblok';

type SearchConfigBlokContent = {
  introduction?: string;
  categoriesLeftBox?: SbCtaLinkProps['blok'][];
  categoriesRightBox?: SbCtaLinkProps['blok'][];
  categoriesHeadline?: string;
  emptySearchMessage?: string;
  categoriesLeftHeadline?: string;
  categoriesRightHeadline?: string;
  suggestionsAmount?: string;
};

export type SearchConfig = {
  introduction: string;
  categoriesLeftBox?: SbCtaLinkProps['blok'][];
  categoriesRightBox?: SbCtaLinkProps['blok'][];
  categoriesHeadline: string;
  emptySearchMessage: string;
  categoriesLeftHeadline: string;
  categoriesRightHeadline: string;
  suggestionsAmount: number;
};

const BUILD_ID = process.env.BUILD_ID || '';

// Track function execution for cache debugging
let executionCounter = 0;

/**
 * Get the global search configuration from Storyblok.
 * This function is the actual implementation that gets cached.
 */
export const getSearchConfigBlok = async () => {
  const execId = ++executionCounter;
  console.log(`[CACHE EXEC ${execId}] getSearchConfigBlok - Function EXECUTING (cache miss or first call)`);

  const storyblokApi = getStoryblokClient();

  // Get the global configuration.
  const { data: { story } } = await storyblokApi.get(
    'cdn/stories/global-components/search-overlay/search-overlay',
    {
      // We have separate dev/prod spaces; we always want the published config from each space
      version: 'published',
      // Let Storyblok handle cache invalidation automatically
    },
  );

  const {
    introduction = '',
    categoriesLeftBox,
    categoriesRightBox,
    categoriesHeadline = '',
    emptySearchMessage = '',
    categoriesLeftHeadline = '',
    categoriesRightHeadline = '',
    suggestionsAmount,
  } = story?.content as SearchConfigBlokContent ?? {};

  const result = {
    introduction,
    categoriesLeftBox,
    categoriesRightBox,
    categoriesHeadline,
    emptySearchMessage,
    categoriesLeftHeadline,
    categoriesRightHeadline,
    suggestionsAmount: parseInt(suggestionsAmount, 10) || 0,
  } as SearchConfig;

  console.log(`[CACHE EXEC ${execId}] getSearchConfigBlok - Function COMPLETED`);
  return result;
};

/**
 * The actual cached function
 */
const cachedGetSearchConfigBlok = unstable_cache(
  getSearchConfigBlok,
  ['search-configuration', BUILD_ID], // Include BUILD_ID for fresh content per build
  {
    tags: ['global', 'config', 'search'],
    // Cache for 10 minutes as config changes are infrequent
    revalidate: 600,
  },
);

/**
 * Get the global search configuration from Storyblok through the cache.
 * This wrapper adds logging to track cache hits/misses.
 */
export const getSearchConfigBlokCached = async () => {
  const cacheKey = `search-configuration:${BUILD_ID}`;
  const startTime = Date.now();

  console.log(`[CACHE CHECK] getSearchConfigBlok - Checking unstable_cache (key: ${cacheKey})`);
  console.log(`[CACHE INFO] getSearchConfigBlok - BUILD_ID: ${BUILD_ID}, revalidate: 600s, tags: global,config,search`);

  const result = await cachedGetSearchConfigBlok();

  const duration = Date.now() - startTime;
  console.log(`[CACHE RESULT] getSearchConfigBlok - unstable_cache returned in ${duration}ms`);

  if (duration < 10) {
    console.log(`[CACHE HIT LIKELY] getSearchConfigBlok - Fast return suggests cached data was used`);
  } else {
    console.log(`[CACHE MISS LIKELY] getSearchConfigBlok - Slow return suggests function executed`);
  }

  return result;
};
