import { type MetadataRoute } from 'next';
import StoryblokClient from 'storyblok-js-client';
import type { ISbStoriesParams } from 'storyblok-js-client';
import { isProduction } from '@/utilities/getActiveEnv';
import { sbStripSlugURL } from '@/utilities/sbStripSlugUrl';

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const storyblokClient = new StoryblokClient({
    accessToken: process.env.STORYBLOK_ACCESS_TOKEN,
    cache: {
      clear: 'auto',
      type: 'memory',
    },
  });

  const isProd = isProduction();
  // Fetch new content from storyblok.
  const sbParams: ISbStoriesParams = {
    version: isProd ? 'published' : 'draft',
    resolve_links: '0',
    resolve_assets: 0,
  };

  // Fetch all the stories from SB.
  // We use the `cdn/stories` endpoint because it has the last published time which `cdn/links` does not.
  const response = await storyblokClient.getAll('cdn/stories', sbParams);

  // Exclude any stories with noindex set to true and those inside the Global Components or Test folders in Storyblok
  const indexStories = response.filter(
    (story) => {
      if (story.content?.noindex) {
        return false;
      }

      // Currently we only have a test-items/ folder in Storyblok. Added the /test/ folder in case someone adds it in the future.
      if (story.full_slug.startsWith('global-components/') || story.full_slug.startsWith('test/') || story.full_slug.startsWith('test-items/')) {
        return false;
      }

      return true;
    },
  );
  const currentURL = process.env.URL || process.env.DEPLOY_PRIME_URL || 'https://giving.stanford.edu';

  const ret = indexStories.map((story) => {
    const url = `${currentURL}${sbStripSlugURL(story.full_slug)}`;
    return {
      url: url.replace(/\/+$/, ''),
      lastModified: new Date(story.published_at),
      changeFrequency: 'daily' as const,
      priority: 0.5,
    };
  });

  return ret;
};

export default sitemap;
