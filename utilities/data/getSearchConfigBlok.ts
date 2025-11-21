import { unstable_cache } from 'next/cache';
import { type SbCtaLinkProps } from '@/components/Storyblok/SbCtaLink';
import { getStoryblokClient, ensureStoryblokInitialized } from '@/utilities/storyblok';

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

/**
 * Get the global search configuration from Storyblok.
 */
export const getSearchConfigBlok = async () => {
  await ensureStoryblokInitialized();
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
  ['search-configuration', BUILD_ID], // Include BUILD_ID for fresh content per build
  {
    tags: ['global', 'config', 'search'],
    // Cache for 10 minutes as config changes are infrequent
    revalidate: 600,
  },
);
