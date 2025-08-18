import { unstable_cache } from 'next/cache';
import { type SbCtaProps } from '@/components/Storyblok/SbCtaLink';
import { getStoryblokApi } from '@storyblok/react/rsc';

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

  // Get the global configuration.
  const { data: { story } } = await storyblokApi.get(
    'cdn/stories/global-components/search-overlay/search-overlay',
    {
      // We have separate dev/prod spaces; we always want the published config from each space
      version: 'published',
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
