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
 * - Uses Next.js 16's `use cache` directive for automatic caching
 * - Storyblok SDK uses built-in memory cache with automatic clearing
 * - Cache entries are stored in-memory and respect the default cacheLife profile
 * - Search config fetched once and shared across all pages in a build
 */
export const getSearchConfigBlok = async () => {
  'use cache';

  console.log('[getSearchConfigBlok] Fetching search config...');

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

  console.log('[getSearchConfigBlok] Successfully fetched search config');

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
