import { unstable_cache } from 'next/cache';
import { getStoryblokApi } from '@/utilities/storyblok';
import { type SbLinkType } from '@/components/Storyblok/Storyblok.types';
import { type StoryblokRichtext } from 'storyblok-rich-text-react-renderer';
import { type SbAlertBgColorType, type SbAlertIconType } from '@/components/Storyblok/SbAlert';

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
 * Get the global search configuration from Storyblok.
 */
export const getGlobalAlerts = async () => {
  const storyblokApi = getStoryblokApi();

  // Get the global configuration.
  const { data: { stories } } = await storyblokApi.getStories({
    starts_with: 'global-components/alerts/',
    // Only show published alerts; we don't want the dev site to always show EVERY existing alert
    version: 'published',
    token: process.env.STORYBLOK_ACCESS_TOKEN,
  });

  console.log({ stories });

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
 * Get the global search configuration from Storyblok through the cache.
 */
export const getGlobalAlertsCached = unstable_cache(
  getGlobalAlerts,
  ['global-alerts'],
  {
    tags: ['global', 'alerts'],
  },
);
