import { type SbLinkType } from '@/components/Storyblok/Storyblok.types';
import { cacheLife } from 'next/cache';
import { type StoryblokRichtext } from 'storyblok-rich-text-react-renderer';
import { type SbAlertBgColorType, type SbAlertIconType } from '@/components/Storyblok/SbAlert';
import { getStoryblokClient } from '@/utilities/storyblok';
import { logError, logInfo } from '@/utilities/logger';

export type AlertContent = {
  uuid: string;
  cta?: SbLinkType;
  ctaText?: string;
  label?: string;
  alertBodyText?: StoryblokRichtext;
  backgroundColor?: SbAlertBgColorType;
  fontAwesomeIcon?: SbAlertIconType;
};

/**
 * Get all the published (global) alerts from Storyblok.
 *
 * **Version Strategy (Next.js 16)**:
 * - Always fetches `version: 'published'` content
 * - Filters for alerts marked as global (isGlobal: true)
 * - Only shows published alerts on both dev and prod environments
 *
 * **Caching Strategy**:
 * - Uses Next.js 16's `use cache` directive for automatic caching
 * - Storyblok SDK uses built-in memory cache with automatic clearing
 * - Cache entries are stored in-memory and respect the default cacheLife profile
 * - Global alerts fetched once and shared across all pages in a build
 *
 * **Error Handling**:
 * - Storyblok SDK handles retries internally
 * - Returns empty array on failure to prevent breaking the entire page
 * - Logs errors for debugging and monitoring
 */
export const getGlobalAlerts = async (): Promise<AlertContent[]> => {
  'use cache';

  cacheLife({
    stale: 2592000, // 1 month in seconds
    revalidate: 31536000, // 1 year in seconds
    expire: 31536000, // 1 year in seconds
  });

  logInfo('Fetching GlobalAlerts at runtime', { timestamp: new Date().toISOString() });

  const storyblokApi = getStoryblokClient();

  try {
    // Get the global alerts.
    const { data: { stories } } = await storyblokApi.getStories({
      starts_with: 'global-components/alerts/',
      content_type: 'alert',
      // Only show published alerts; we don't want the dev site to always show EVERY existing alert.
      version: 'published',
      sort_by: 'published_at:desc',
      // Let Storyblok handle cache invalidation automatically
      // Only alerts set as global.
      filter_query: {
        isGlobal: {
          in: 'true',
        },
      },
    });

    return stories?.map(({ content, uuid }) => ({
      uuid,
      cta: content.cta,
      ctaText: content.ctaText,
      label: content.label,
      alertBodyText: content.alertBodyText,
      backgroundColor: content.backgroundColor,
      fontAwesomeIcon: content.fontAwesomeIcon,
    })) ?? [];
  } catch (error: unknown) {
    // Log and return empty array - alerts are non-critical, don't break the page
    logError('Failed to fetch global alerts from Storyblok API', error);
    return [];
  }
};
