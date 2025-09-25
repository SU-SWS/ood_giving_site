import { type Metadata } from 'next';
import { StoryblokStory } from '@storyblok/react/rsc';
import { resolveRelations } from '@/utilities/resolveRelations';
import { getPageMetadata } from '@/utilities/getPageMetadata';
import { notFound } from 'next/navigation';
import { getStoryData, getAllStories } from '@/utilities/data/';
import { isProduction } from '@/utilities/getActiveEnv';

type PathsType = {
  slug: string[];
};

type PageParams = {
  slug?: string | string[];
};

type PageProps = {
  params: Promise<PageParams>;
};

// Storyblok bridge options.
const bridgeOptions = {
  resolveRelations,
  resolveLinks: 'story',
};

// Do not allow dynamic params — only the statically generated paths will be served.
// This ensures requests for unknown paths return the Next.js 404 instead of
// triggering runtime fallback logic that can produce a NoFallbackError.
export const dynamicParams = false;

/**
 * Generate the list of stories to statically render.
 */
export const generateStaticParams = async () => {
  const isProd = isProduction();

  try {
    // In production builds we want the freshest list of stories — call the uncached fetch.
    let stories = await getAllStories();

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
 * Resolve the slug path for a given slug array.
 * @param slug string array from the URL
 * @returns string
 */
const normalizeSlugSegments = (slug?: string | string[]) => {
  if (!slug) {
    return [] as string[];
  }

  const segments = Array.isArray(slug) ? slug : [slug];

  return segments.filter((segment) => segment.length);
};

const resolveSlugPath = async (params: PageProps['params']) => {
  const { slug } = await params;
  const segments = normalizeSlugSegments(slug);
  return segments.length ? segments.join('/') : 'home';
};

/**
 * Fetch the story data or throw a 404 if not found.
 * @param slugPath string path to fetch
 * @returns story or throws notFound()
 */
const getStoryOrThrowNotFound = async (slugPath: string) => {
  const { data } = await getStoryData({ path: slugPath });

  if (data === 404) {
    notFound();
  }

  if (!data.story || !data.story.content) {
    console.error(`Story structure invalid for path: ${slugPath}`, data);
    notFound();
  }

  return data.story;
};

/**
 * Generate the SEO metadata for the page.
 */
export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
  const slugPath = await resolveSlugPath(params);
  const story = await getStoryOrThrowNotFound(slugPath);

  return getPageMetadata({ story, slug: slugPath });
};

/**
 * Fetch the path data for the page and render it.
 */
const Page = async ({ params }: PageProps) => {
  const slugPath = await resolveSlugPath(params);
  const story = await getStoryOrThrowNotFound(slugPath);

  return (
    <StoryblokStory
      story={story}
      bridgeOptions={bridgeOptions}
      slug={slugPath}
      name={story.name}
    />
  );
};

export default Page;
