import { unstable_cache } from 'next/cache';
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

const BUILD_ID = process.env.BUILD_ID || '';

// Track function execution for cache debugging
let executionCounter = 0;

/**
 * Get all the published (global) alerts from Storyblok.
 * This function is the actual implementation that gets cached.
 */
export const getGlobalAlerts = async () => {
  const execId = ++executionCounter;
  console.log(`[CACHE EXEC ${execId}] getGlobalAlerts - Function EXECUTING (cache miss or first call)`);

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

  const result = stories?.map(({ content, uuid }) => ({
    uuid,
    cta: content.cta,
    ctaText: content.ctaText,
    label: content.label,
    alertBodyText: content.alertBodyText,
    backgroundColor: content.backgroundColor,
    fontAwesomeIcon: content.fontAwesomeIcon,
  })) ?? [] as AlertContent[];

  console.log(`[CACHE EXEC ${execId}] getGlobalAlerts - Function COMPLETED (found ${result.length} alerts)`);
  return result;
};

/**
 * The actual cached function
 */
const cachedGetGlobalAlerts = unstable_cache(
  getGlobalAlerts,
  ['global-alerts', BUILD_ID], // Include BUILD_ID for fresh content per build
  {
    tags: ['global', 'alerts'],
    // Cache for 10 minutes.
    revalidate: 600,
  },
);

/**
 * Get the global alerts from Storyblok through the cache.
 * This wrapper adds logging to track cache hits/misses.
 */
export const getGlobalAlertsCached = async () => {
  const cacheKey = `global-alerts:${BUILD_ID}`;
  const startTime = Date.now();

  console.log(`[CACHE CHECK] getGlobalAlerts - Checking unstable_cache (key: ${cacheKey})`);
  console.log(`[CACHE INFO] getGlobalAlerts - BUILD_ID: ${BUILD_ID}, revalidate: 600s, tags: global,alerts`);

  const result = await cachedGetGlobalAlerts();

  const duration = Date.now() - startTime;
  console.log(`[CACHE RESULT] getGlobalAlerts - unstable_cache returned in ${duration}ms`);

  if (duration < 10) {
    console.log(`[CACHE HIT LIKELY] getGlobalAlerts - Fast return suggests cached data was used`);
  } else {
    console.log(`[CACHE MISS LIKELY] getGlobalAlerts - Slow return suggests function executed`);
  }

  return result;
};
