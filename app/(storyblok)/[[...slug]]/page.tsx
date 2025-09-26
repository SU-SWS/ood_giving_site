import { type Metadata } from 'next';
import { StoryblokStory } from '@storyblok/react/rsc';
import { resolveRelations } from '@/utilities/resolveRelations';
import { getPageMetadata } from '@/utilities/getPageMetadata';
import { notFound } from 'next/navigation';
import { getStoryDataSmart, getKnownSlugs, getKnownSlugsCached } from '@/utilities/data/';

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

// Allow dynamic params so that unknown paths can be handled by runtime guards
// (which call notFound) rather than triggering a framework-level NoFallbackError
// in serverless environments like Netlify.
export const dynamicParams = true;

// Optimize for static generation and edge caching
export const revalidate = 604800; // 7 days for edge caching

/**
 * Generate the list of stories to statically render.
 */
export const generateStaticParams = async () => {
  try {
    // Use the known slugs function with build=true to get fresh content during builds
    const knownSlugs = await getKnownSlugs(true);
    const paths: PathsType[] = [];

    knownSlugs.forEach((slugPath) => {
      if (slugPath === '' || slugPath === 'home') {
        // Empty array for the home slug
        paths.push({ slug: [] });
      } else {
        const splitSlug = slugPath.split('/');
        paths.push({ slug: splitSlug });
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

/**
 * Resolve the slug path for a given slug array.
 * @param slug string array from the URL
 * @returns string
 */
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
  // Early validation: check if slug is known to avoid unnecessary Storyblok requests
  const knownSlugs = await getKnownSlugsCached();
  if (!knownSlugs.has(slugPath)) {
    notFound();
  }

  const { data } = await getStoryDataSmart({ path: slugPath });

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
