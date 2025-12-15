'use cache';

import { type Metadata } from 'next';
import { cacheLife } from 'next/cache';
import { StoryblokStory } from '@storyblok/react/rsc';
import { resolveRelations } from '@/utilities/resolveRelations';
import { getPageMetadata } from '@/utilities/getPageMetadata';
import { notFound } from 'next/navigation';
import { getStoryData, getAllStories } from '@/utilities/data/';
import { isProduction } from '@/utilities/getActiveEnv';
import { validateSlugPath, slugArrayToPath } from '@/utilities/validateSlugPath';
import { getStoryblokClient } from '@/utilities/storyblok';
import { logError, logDebug, logInfo } from '@/utilities/logger';

type PropsType = {
  params: Promise<{ slug: string[] }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

type PathsType = {
  slug: string[];
}[];

// Storyblok bridge options.
const bridgeOptions = {
  resolveRelations,
  resolveLinks: 'story',
};

// Initialize Storyblok client.
getStoryblokClient();

/**
 * Generate the list of stories to statically render.
 */
export const generateStaticParams = async () => {
  logInfo('generateStaticParams: starting');
  const isProd = isProduction();

  // Get all the stories.
  let stories = await getAllStories();

  // Filter out folders.
  stories = stories.filter((link) => link.is_folder === false);
  // Filter out test content by filtering out the `test` folder.
  if (isProd) {
    stories = stories.filter((link) => !link.slug.startsWith('test'));
  }
  // Filter out globals by filtering out the `global-components` folder.
  stories = stories.filter((link) => !link.slug.startsWith('global-components'));

  const paths: PathsType = [];

  stories.forEach((story) => {
    const slug = story.slug;
    const splitSlug = slug.split('/');

    // Remove any empty strings.
    const cleanSlug = splitSlug.filter((s: string) => s.length);

    if (cleanSlug.length === 1 && cleanSlug[0] === 'home') {
      // Pass an empty array for the home slug
      paths.push({ slug: [] });
    } else {
      paths.push({ slug: cleanSlug });
    }
  });

  logInfo('generateStaticParams: completed', { pathCount: paths.length });

  return paths;
};

/**
 * Generate the SEO metadata for the page.
 */
export const generateMetadata = async (props: PropsType): Promise<Metadata> => {
  const { params } = props;
  const { slug } = await params;
  const slugPath = slugArrayToPath(slug || []);

  // Ensure Storyblok client is initialized before any cached data access
  getStoryblokClient();

  try {

  // Validate the slug path before making any API calls
  const isValidPath = await validateSlugPath(slug || []);
  if (!isValidPath) {
    // Return minimal metadata for 404 pages
    return {
      title: 'Page Not Found',
      description: 'The requested page could not be found.',
    };
  }

  // Get the story data.
  const { data } = await getStoryData({ path: slugPath });

  if (data === 404 || !data.story) {
    // Return minimal metadata for 404 pages
    return {
      title: 'Page Not Found',
      description: 'The requested page could not be found.',
    };
  }

  const story = data.story;

  // Generate the metadata.
  const meta = getPageMetadata({ story, slug: slugPath });
  return meta;
  } catch (error) {
    logError('Error generating metadata', error, { slug });
    return {
      title: 'Metadata Error',
      description: 'The requested page could not get metadata.',
    };
  }
};

/**
 * Fetch the path data for the page and render it.
 * Cached for the maximum duration - rebuilds will clear the cache.
 */
const Page = async (props: PropsType) => {
  // Cache this page with 1 month stale time, 1 year revalidate. Each build creates fresh cache.
  cacheLife({
    stale: 2592000, // 1 month in seconds
    revalidate: 31536000, // 1 year in seconds
    expire: 31536000, // 1 year in seconds
  });

  const { params } = props;
  const { slug } = await params;
  const slugPath = slugArrayToPath(slug || []);

  logDebug('Page: rendering', { slugPath });

  // Validate the slug path before making any API calls
  const isValidPath = await validateSlugPath(slug || []);
  if (!isValidPath) {
    logDebug('Page: invalid path, returning 404', { slugPath });
    // Return 404 immediately for invalid paths without hitting Storyblok API
    notFound();
  }

  // Initialize Storyblok client. Belt. Suspenders.
  getStoryblokClient();

  // Get data out of the API.
  const { data } = await getStoryData({ path: slugPath });

  // Failed to fetch from API because story slug was not found.
  if (data && data === 404) {
    logDebug('Page: story not found in Storyblok, returning 404', { slugPath });
    notFound();
  }

  // Ensure there is a story in the data.
  if (!data || !data.story) {
    logError('Page: no story in response data', undefined, { slugPath, data });
    throw new Error(`No story found for slugPath: ${slugPath}`);
  }

  logDebug('Page: rendering StoryblokStory', {
    slugPath,
    storyName: data.story.name,
    storyComponent: data.story.content?.component,
  });

  // Return the story.

  return (
    <StoryblokStory
      story={data.story}
      bridgeOptions={bridgeOptions}
      slug={slugPath}
      name={data.story.name}
    />
  );
};

export default Page;
