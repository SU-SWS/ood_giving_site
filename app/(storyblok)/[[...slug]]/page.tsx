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

  return paths;
};

/**
 * Generate the SEO metadata for the page.
 *
 * **Error Handling Strategy**:
 * - For 404s (content not found): Return fallback metadata (expected case)
 * - For network/API errors: Log and re-throw to prevent caching broken metadata
 *
 * By throwing on transient errors, Next.js will:
 * 1. NOT cache the broken response
 * 2. Continue serving the previously cached version (stale-while-revalidate)
 * 3. Retry the fetch on the next request
 */
export const generateMetadata = async (props: PropsType): Promise<Metadata> => {
  const { params } = props;
  const { slug } = await params;
  const slugPath = slugArrayToPath(slug || []);

  // Validate the slug path before making any API calls
  const isValidPath = await validateSlugPath(slug || []);
  if (!isValidPath) {
    // Return minimal metadata for 404 pages (expected case, safe to cache)
    return {
      title: 'Page Not Found',
      description: 'The requested page could not be found.',
    };
  }

  try {
    // Get the story data.
    const { data } = await getStoryData({ path: slugPath });

    if (data === 404 || !data.story) {
      // Return minimal metadata for 404 pages (expected case, safe to cache)
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
    // Log the error with full context for debugging
    logError('generateMetadata failed - throwing to preserve cache', error, {
      slugPath,
      slugArray: slug,
      phase: 'metadata',
    });
    // Re-throw to prevent caching broken metadata
    throw error;
  }
};

/**
 * Fetch the path data for the page and render it.
 *
 * **Error Handling Strategy**:
 * - For 404s (content not found): Call notFound() to render 404 page
 * - For network/API errors: Log and let errors propagate (throw) to prevent caching
 *
 * By allowing errors to throw (not catching them), Next.js will:
 * 1. NOT cache the broken response
 * 2. Continue serving the previously cached version (stale-while-revalidate)
 * 3. Retry the fetch on the next request
 * 4. Render the error.tsx boundary for the current request only
 */
const Page = async (props: PropsType) => {
  const { params } = props;
  const { slug } = await params;
  const slugPath = slugArrayToPath(slug || []);

  // Validate the slug path before making any API calls
  const isValidPath = await validateSlugPath(slug || []);
  if (!isValidPath) {
    // Return 404 immediately for invalid paths without hitting Storyblok API
    notFound();
  }

  // Initialize Storyblok client. Belt. Suspenders.
  getStoryblokClient();

  try {
    // Get data out of the API.
    const { data } = await getStoryData({ path: slugPath });

    // Failed to fetch from API because story slug was not found.
    if (data && data === 404) {
      notFound();
    }

    // Ensure there is a story in the data.
    if (!data || !data.story) {
      const noStoryError = new Error(`No story found for slugPath: ${slugPath}`);
      logError('Page render failed - no story in response', noStoryError, {
        slugPath,
        slugArray: slug,
        phase: 'render',
        dataReceived: !!data,
      });
      throw noStoryError;
    }

    return (
      <StoryblokStory
        story={data.story}
        bridgeOptions={bridgeOptions}
        slug={slugPath}
        name={data.story.name}
      />
    );
  } catch (error) {
    // Log all errors with full context for debugging
    logError('Page render failed - throwing to preserve cache', error, {
      slugPath,
      slugArray: slug,
      phase: 'render',
    });
    // Re-throw to trigger error boundary and preserve SWR cache
    throw error;
  }
};

export default Page;
