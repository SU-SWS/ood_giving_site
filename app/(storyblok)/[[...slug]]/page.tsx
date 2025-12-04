import { type Metadata } from 'next';
import { StoryblokStory } from '@storyblok/react/rsc';
import { resolveRelations } from '@/utilities/resolveRelations';
import { getPageMetadata } from '@/utilities/getPageMetadata';
import { notFound } from 'next/navigation';
import { getStoryData, getAllStories } from '@/utilities/data/';
import { isProduction } from '@/utilities/getActiveEnv';
import { validateSlugPath, slugArrayToPath } from '@/utilities/validateSlugPath';
import { getStoryblokClient } from '@/utilities/storyblok';
import { logError } from '@/utilities/logger';

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
  console.log('[generateStaticParams] Starting...');
  const isProd = isProduction();

  // Get all the stories.
  let stories = await getAllStories();
  console.log(`[generateStaticParams] Got ${Object.keys(stories).length} stories from Storyblok`);

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

  console.log(`[generateStaticParams] Returning ${paths.length} paths for static generation`);
  return paths;
};

/**
 * Generate the SEO metadata for the page.
 */
export const generateMetadata = async (props: PropsType): Promise<Metadata> => {
  const { params } = props;
  const { slug } = await params;
  const slugPath = slugArrayToPath(slug || []);
  console.log(`[generateMetadata] Generating metadata for: ${slugPath}`);

  try {

  // Validate the slug path before making any API calls
  const isValidPath = await validateSlugPath(slug || []);
  if (!isValidPath) {
    console.log(`[generateMetadata] Invalid path: ${slugPath}`);
    // Return minimal metadata for 404 pages
    return {
      title: 'Page Not Found',
      description: 'The requested page could not be found.',
    };
  }

  // Get the story data.
  const { data } = await getStoryData({ path: slugPath });

  if (data === 404 || !data.story) {
    console.log(`[generateMetadata] Story data is 404 for: ${slugPath}`);
    // Return minimal metadata for 404 pages
    return {
      title: 'Page Not Found',
      description: 'The requested page could not be found.',
    };
  }

  const story = data.story;

  // Generate the metadata.
  const meta = getPageMetadata({ story, slug: slugPath });
  console.log(`[generateMetadata] Successfully generated metadata for: ${slugPath}`);
  return meta;
  } catch (error) {
    console.error(`[generateMetadata] Error for ${slugPath}:`, error);
    logError('Error generating metadata', error, { slug });
    return {
      title: 'Metadata Error',
      description: 'The requested page could not get metadata.',
    };
  }
};

/**
 * Fetch the path data for the page and render it.
 */
const Page = async (props: PropsType) => {
  const { params } = props;
  const { slug } = await params;
  const slugPath = slugArrayToPath(slug || []);
  console.log(`[Page] Rendering page: ${slugPath}`);

  // Validate the slug path before making any API calls
  const isValidPath = await validateSlugPath(slug || []);
  if (!isValidPath) {
    console.log(`[Page] Invalid path, returning 404: ${slugPath}`);
    // Return 404 immediately for invalid paths without hitting Storyblok API
    notFound();
  }

  // Initialize Storyblok client. Belt. Suspenders.
  getStoryblokClient();

  // Get data out of the API.
  const { data } = await getStoryData({ path: slugPath });

  // Failed to fetch from API because story slug was not found.
  if (data && data === 404) {
    console.log(`[Page] Story not found (404): ${slugPath}`);
    notFound();
  }

  // Ensure there is a story in the data.
  if (!data || !data.story) {
    console.error(`[Page] No story data for: ${slugPath}`);
    throw new Error(`No story found for slugPath: ${slugPath}`);
  }

  console.log(`[Page] Successfully rendering: ${slugPath}`);

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
