import { cache } from 'react';
import { type SbLinkType } from '@/components/Storyblok/Storyblok.types';
import { type StoryblokRichtext } from 'storyblok-rich-text-react-renderer';
import { type SbAlertBgColorType, type SbAlertIconType } from '@/components/Storyblok/SbAlert';
import { getStoryblokClient } from '@/utilities/storyblok';

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
 * - Storyblok SDK uses built-in memory cache with automatic clearing
 * - Wrapped by React's `cache` function for build-time deduplication
 * - Global alerts fetched once and shared across all pages in a build
 */
export const getGlobalAlerts = async () => {
  const storyblokApi = getStoryblokClient();

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
  })) ?? [] as AlertContent[];
};

/**
 * Get the global alerts from Storyblok through the cache.
 *
 * Uses Next.js 16's stable `cache` function for build-time deduplication.
 * Global alerts are fetched once per build and shared across all pages.
 *
 * Cache keys are automatically derived from function arguments by React.
 */
export const getGlobalAlertsCached = cache(getGlobalAlerts);
