import { isProduction } from '@/utilities/getActiveEnv';
import { unstable_cache } from 'next/cache';
import { getStoryblokApi } from '@/utilities/storyblok';
import { type SbCtaProps } from '@/components/Storyblok/SbCtaLink';

type SearchConfigBlokContent = {
  introduction?: string;
  categoriesLeftBox?: SbCtaProps['blok'][];
  categoriesRightBox?: SbCtaProps['blok'][];
  categoriesHeadline?: string;
  emptySearchMessage?: string;
  categoriesLeftHeadline?: string;
  categoriesRightHeadline?: string;
  suggestionsAmount?: string;
};

export type SearchConfig = {
  introduction: string;
  categoriesLeftBox?: SbCtaProps['blok'][];
  categoriesRightBox?: SbCtaProps['blok'][];
  categoriesHeadline: string;
  emptySearchMessage: string;
  categoriesLeftHeadline: string;
  categoriesRightHeadline: string;
  suggestionsAmount: number;
};

/**
 * Get the global search configuration from Storyblok.
 */
export const getSearchConfigBlok = async () => {
  const storyblokApi = getStoryblokApi();
  const isProd = isProduction();

  // Get the global configuration.
  const { data: { story } } = await storyblokApi.get(
    'cdn/stories/global-components/search-overlay/search-overlay',
    {
      version: isProd ? 'published' : 'draft',
      token: process.env.STORYBLOK_ACCESS_TOKEN,
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

  return {
    introduction,
    categoriesLeftBox,
    categoriesRightBox,
    categoriesHeadline,
    emptySearchMessage,
    categoriesLeftHeadline,
    categoriesRightHeadline,
    suggestionsAmount: parseInt(suggestionsAmount, 10) || 0,
  } as SearchConfig;
};

/**
 * Get the global search configuration from Storyblok through the cache.
 */
export const getSearchConfigBlokCached = unstable_cache(
  getSearchConfigBlok,
  ['search-configuration'],
  {
    tags: ['global', 'config', 'search'],
  },
);
