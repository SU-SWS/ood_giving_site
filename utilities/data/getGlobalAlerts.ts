import { unstable_cache } from 'next/cache';
import { type SbLinkType } from '@/components/Storyblok/Storyblok.types';
import { type StoryblokRichtext } from 'storyblok-rich-text-react-renderer';
import { type SbAlertBgColorType, type SbAlertIconType } from '@/components/Storyblok/SbAlert';
import { getStoryblokApi, type StoryblokClient } from '@storyblok/react/rsc';

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
 */
export const getGlobalAlerts = async () => {
  const storyblokApi: StoryblokClient = getStoryblokApi();

  // Get the global alerts.
  const { data: { stories } } = await storyblokApi.getStories({
    starts_with: 'global-components/alerts/',
    content_type: 'alert',
    // Only show published alerts; we don't want the dev site to always show EVERY existing alert.
    version: 'published',
    token: process.env.STORYBLOK_ACCESS_TOKEN,
    sort_by: 'published_at:desc',
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
 */
export const getGlobalAlertsCached = unstable_cache(
  getGlobalAlerts,
  ['global-alerts'],
  {
    tags: ['global', 'alerts'],
  },
);
