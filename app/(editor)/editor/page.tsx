import { StoryblokStory } from '@storyblok/react/rsc';
import { resolveRelations } from '@/utilities/resolveRelations';
import { notFound } from 'next/navigation';
import { getStoryData } from '@/utilities/data/getStoryData';
import { getStoryblokClient } from '@/utilities/storyblok';

type PageSearchParams = {
  access_key: string;
  path: string;
  _storyblok: string; // ID of space (eg: 1005200)
  _storyblok_c: string;
  _storyblok_version: string;
  _storyblok_lang: string;
  _storyblok_release: string; // number as a string eg: '0'
  _storyblok_rl: string; // eg: '1698435696245'
  '_storyblok_tk[space_id]': string; // eg: '1005200'
  '_storyblok_tk[timestamp]': string; // eg: '1698435695'
  '_storyblok_tk[token]': string; // eg: '654efea80d36a0b2bas3640ea937b0e0d4cc0234'
};

type PageProps = {
  searchParams: Promise<PageSearchParams>;
};

// Control what happens when a dynamic segment is visited that was not generated with generateStaticParams.
export const dynamic = 'force-dynamic';

// Storyblok bridge options.
const bridgeOptions = {
  resolveRelations,
  preventClicks: true,
  resolveLinks: 'story',
};

/**
 * Init on the server.
 */
getStoryblokClient();

/**
 * Fetch the path data for the page and render it.
 */
const Page = async ({ searchParams }: PageProps) => {
  const { access_key: accessKey, path } = await searchParams;

  // Not a valid editor token.
  if (accessKey !== process.env.STORYBLOK_PREVIEW_EDITOR_TOKEN) {
    console.error('Invalid editor token');
    notFound();
  }

  const slug = path ? path : 'home';

  // Get data out of the API.
  const { data } = await getStoryData({ path: slug, isEditor: true });

  // Failed to fetch from API because story slug was not found.
  if (data === 404) {
    notFound();
  }

  // Return the story.
  return (
    <StoryblokStory
      story={data.story}
      bridgeOptions={bridgeOptions}
      slug={slug === 'home' ? '/' : slug}
      name={data.story.name}
    />
  );
};

export default Page;
