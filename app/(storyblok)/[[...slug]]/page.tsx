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

// Force the 404 page for anything that isn't statically generated.
export const dynamicParams = false;

// Cache for one year.
// I have no concrete evidence but this seems to work best with Netlify's edge caching over caching for infinity.
export const revalidate = 31536000;

// Force static rendering.
export const dynamic = 'force-static';

/**
 * Generate the list of stories to statically render.
 */
export const generateStaticParams = async () => {
  const isProd = isProduction();

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
};

/**
 * Generate the SEO metadata for the page.
 */
export const generateMetadata = async ({ params }: ParamsType): Promise<Metadata> => {
  const { slug } = await params;

  // Convert the slug to a path.
  // Slug will be falsy if root/home route
  const slugPath = slug ? slug.join('/') : 'home';

  // Get the story data.
  const { data: { story } } = await getStoryDataCached({ path: slugPath });

  // Generate the metadata.
  const meta = getPageMetadata({ story, slug: slugPath });
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

  // Get data out of the API.
  const { data } = await getStoryDataCached({ path: slugPath });

  // Failed to fetch from API because story slug was not found.
  if (data === 404) {
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
