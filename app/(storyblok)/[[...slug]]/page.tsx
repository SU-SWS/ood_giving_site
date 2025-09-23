import { type Metadata } from 'next';
import { StoryblokStory } from '@storyblok/react/rsc';
import { resolveRelations } from '@/utilities/resolveRelations';
import { getPageMetadata } from '@/utilities/getPageMetadata';
import { notFound } from 'next/navigation';
import { getStoryDataCached, getAllStoriesCached } from '@/utilities/data/';
import { isProduction } from '@/utilities/getActiveEnv';

type PathsType = {
  slug: string[];
};

type ParamsType = {
  params: Promise<PathsType>;
};

// Storyblok bridge options.
const bridgeOptions = {
  resolveRelations,
  resolveLinks: 'story',
};

// Allow dynamic params for content published between builds
export const dynamicParams = true;

// Cache indefinitely - rely on atomic rebuilds for content updates
export const revalidate = false;

// Force static rendering.
export const dynamic = 'force-static';

/**
 * Generate the list of stories to statically render.
 */
export const generateStaticParams = async () => {
  const isProd = isProduction();

  try {
    // Get all the stories.
    let stories = await getAllStoriesCached();

    // Filter out folders.
    stories = stories.filter((link) => link.is_folder === false);
    // Filter out test content by filtering out the `test` folder.
    if (isProd) {
      stories = stories.filter((link) => !link.slug.startsWith('test'));
    }
    // Filter out globals by filtering out the `global-components` folder.
    stories = stories.filter((link) => !link.slug.startsWith('global-components'));

    const paths: PathsType[] = [];

    stories.forEach((story) => {
      const slug = story.slug;
      const splitSlug = slug.split('/');

      // Remove any empty strings.
      const cleanSlug = splitSlug.filter((s:string) => s.length);

      if (cleanSlug.length === 1 && cleanSlug[0] === 'home') {
        // Pass and empty array for the home slug
        paths.push({ slug: [] });
      } else {
        paths.push({ slug: cleanSlug });
      }
    });

    return paths;
  } catch (error) {
    console.error('Failed to generate static params for Storyblok:', error);
    // Return minimal paths to prevent build failure
    return [{ slug: [] }]; // At least include home page
  }
};

/**
 * Cache of known story slugs for validation (populated at build time)
 */
let knownSlugsCache: Set<string> | null = null;

/**
 * Initialize and get the cache of known story slugs
 */
const getKnownSlugs = async (): Promise<Set<string>> => {
  if (knownSlugsCache) {
    return knownSlugsCache;
  }

  try {
    const stories = await getAllStoriesCached();
    const isProd = isProduction();

    // Apply same filters as generateStaticParams
    const filteredStories = stories
      .filter((link) => link.is_folder === false)
      .filter((link) => isProd ? !link.slug.startsWith('test') : true)
      .filter((link) => !link.slug.startsWith('global-components'));

    const slugs = new Set<string>();
    slugs.add('home'); // Always include home

    filteredStories.forEach((story) => {
      slugs.add(story.slug);
    });

    knownSlugsCache = slugs;
    return slugs;
  } catch (error) {
    console.error('Failed to load known slugs:', error);
    // Return minimal set to prevent failures
    return new Set(['home']);
  }
};

/**
 * Generate the SEO metadata for the page.
 */
export const generateMetadata = async ({ params }: ParamsType): Promise<Metadata> => {
  const { slug } = await params;

  // Convert the slug to a path.
  // Slug will be falsy if root/home route
  const slugPath = slug ? slug.join('/') : 'home';

  // For dynamic params, validate but don't block - let API handle it gracefully
  if (slug && slug.length > 0) {
    try {
      const knownSlugs = await getKnownSlugs();
      if (!knownSlugs.has(slugPath)) {
        console.log(`Unknown slug in metadata: ${slugPath}`, { knownSlugs: Array.from(knownSlugs).slice(0, 5) });
        // Don't block here - let the API call determine if it's truly invalid
      }
    } catch (error) {
      console.error('Error checking known slugs in metadata:', error);
      // Continue without validation if check fails
    }
  }

  // Get the story data.
  const { data } = await getStoryDataCached({ path: slugPath });

  // If story not found, return basic metadata and let Page component handle 404
  if (data === 404) {
    return {
      title: 'Page Not Found | Stanford Giving',
      description: 'The page you are looking for could not be found.',
    };
  }

  // Additional safety check for story structure
  if (!data.story || !data.story.content) {
    return {
      title: 'Page Error | Stanford Giving',
      description: 'There was an error loading this page.',
    };
  }

  // Generate the metadata.
  const meta = getPageMetadata({ story: data.story, slug: slugPath });
  return meta;
};

/**
 * Fetch the path data for the page and render it.
 */
const Page = async ({ params }: ParamsType) => {
  const { slug } = await params;

  // Convert the slug to a path.
  // Slug will be falsy if root/home route
  const slugPath = slug ? slug.join('/') : 'home';

  // For dynamic params, validate but don't block - let API handle it gracefully
  if (slug && slug.length > 0) {
    try {
      const knownSlugs = await getKnownSlugs();
      if (!knownSlugs.has(slugPath)) {
        console.log(`Unknown slug in page: ${slugPath}`, { knownSlugs: Array.from(knownSlugs).slice(0, 5) });
        // Don't block here - let the API call determine if it's truly invalid
      }
    } catch (error) {
      console.error('Error checking known slugs in page:', error);
      // Continue without validation if check fails
    }
  }

  // Get data out of the API.
  const { data } = await getStoryDataCached({ path: slugPath });

  // Failed to fetch from API because story slug was not found.
  if (data === 404) {
    notFound();
  }

  // Additional safety checks for story structure
  if (!data.story || !data.story.content) {
    console.error(`Story structure invalid for path: ${slugPath}`, data);
    notFound();
  }

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
