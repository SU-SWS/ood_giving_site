import { type SbCtaLinkProps } from '@/components/Storyblok/SbCtaLink';
import { getStoryblokClient } from '@/utilities/storyblok';
import { logError } from '@/utilities/logger';

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

/** Default search config to use when Storyblok fetch fails */
const DEFAULT_SEARCH_CONFIG: SearchConfig = {
  introduction: '',
  categoriesLeftBox: undefined,
  categoriesRightBox: undefined,
  categoriesHeadline: '',
  emptySearchMessage: 'No results found.',
  categoriesLeftHeadline: '',
  categoriesRightHeadline: '',
  suggestionsAmount: 0,
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
 *
 * **Error Handling**:
 * - Storyblok SDK handles retries internally
 * - Returns default config on failure to prevent breaking the entire page
 * - Logs errors for debugging and monitoring
 */
export const getSearchConfigBlok = async (): Promise<SearchConfig> => {
  'use cache';

  const storyblokApi = getStoryblokClient();

  try {
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
    };
  } catch (error: unknown) {
    // Log and return default config - search config is non-critical, don't break the page
    logError('Failed to fetch search config from Storyblok API', error);
    return DEFAULT_SEARCH_CONFIG;
  }
};
