import 'dotenv/config';
import { algoliasearch } from 'algoliasearch';
import { type ISbStoriesParams } from '@storyblok/react/rsc';
import { getStoryblokClient } from '@/utilities/storyblok';
import { transformStoryblokRecord } from '@/utilities/algolia/transformStoryblokRecord';
import { logError, logInfo, logWarn } from '@/utilities/logger';

/**
 * Pulls all published content from the Storyblok CDN and performs a full
 * initial load into Algolia. Mirrors the same transform/filter logic used
 * by the storyblok-webhook Netlify function so the index schema stays
 * consistent between incremental updates and a clean rebuild.
 *
 * Usage:
 *   npm run algolia:initial-load
 *
 * Required env vars (same as the webhook function):
 *   NEXT_PUBLIC_ALGOLIA_APP_ID
 *   ALGOLIA_ADMIN_KEY
 *   STORYBLOK_ACCESS_TOKEN
 *
 * Optional:
 *   ALGOLIA_INDEX_NAME (defaults to 'Giving To Stanford (ISR)')
 */

const MAIN_INDEX_NAME = process.env.ALGOLIA_INDEX_NAME
  || process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME
  || 'Giving To Stanford (ISR)';

const STORYBLOK_PARAMS: ISbStoriesParams = {
  version: 'published',
  resolve_links: 'url',
};

/** Number of records saved per Algolia batch request. */
const BATCH_SIZE = 100;

const getAlgoliaClient = () => {
  const appID = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || '';
  const adminKey = process.env.ALGOLIA_ADMIN_KEY || '';

  if (!appID || !adminKey) {
    throw new Error('Missing Algolia credentials: NEXT_PUBLIC_ALGOLIA_APP_ID and/or ALGOLIA_ADMIN_KEY');
  }

  return algoliasearch(appID, adminKey);
};

const main = async () => {
  logInfo('[Initial Load] Starting Storyblok → Algolia initial load', {
    index: MAIN_INDEX_NAME,
  });

  const storyblokApi = getStoryblokClient();
  const algoliaClient = getAlgoliaClient();

  logInfo('[Initial Load] Fetching all published stories from Storyblok CDN...');

  const stories = await storyblokApi.getAll('cdn/stories', STORYBLOK_PARAMS);

  logInfo(`[Initial Load] Fetched ${stories.length} total stories`);

  const records = [];
  let skipped = 0;

  for (const story of stories) {
    const record = transformStoryblokRecord(story);

    if (record) {
      records.push(record);
    } else {
      skipped += 1;
      logWarn('[Initial Load] Skipped story (filtered or no transform)', {
        full_slug: story?.full_slug,
      });
    }
  }

  logInfo(`[Initial Load] ${records.length} records to index, ${skipped} filtered/skipped`);

  if (records.length === 0) {
    logWarn('[Initial Load] No records to index — exiting without modifying the index');
    return;
  }

  let saved = 0;

  for (let i = 0; i < records.length; i += BATCH_SIZE) {
    const batch = records.slice(i, i + BATCH_SIZE);

    await algoliaClient.saveObjects({
      indexName: MAIN_INDEX_NAME,
      objects: batch,
    });

    saved += batch.length;
    logInfo(`[Initial Load] Progress: ${saved}/${records.length} records saved`);
  }

  logInfo(`[Initial Load] Complete. Indexed ${saved} records into "${MAIN_INDEX_NAME}"`);
};

main().catch((error) => {
  logError('[Initial Load] Fatal error during initial load', error);
  process.exit(1);
});
