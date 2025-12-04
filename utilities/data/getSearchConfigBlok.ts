import { cache } from 'react';
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

/**
 * Get the global search configuration from Storyblok.
 *
 * **Version Strategy (Next.js 16)**:
 * - Always fetches `version: 'published'` content
 * - Separate dev/prod Storyblok spaces provide environment-specific configs
 * - Configuration is global and shared across all pages
 *
 * **Caching Strategy**:
 * - Storyblok SDK uses built-in memory cache with automatic clearing
 * - Wrapped by React's `cache` function for build-time deduplication
 * - Search config fetched once and shared across all pages in a build
 */
export const getSearchConfigBlok = async () => {
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
 *
 * Uses Next.js 16's stable `cache` function for build-time deduplication.
 * Search configuration is fetched once per build and shared across all pages.
 *
 * Cache keys are automatically derived from function arguments by React.
 */
export const getSearchConfigBlokCached = cache(getSearchConfigBlok);
