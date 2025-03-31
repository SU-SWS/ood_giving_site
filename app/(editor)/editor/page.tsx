import type { PageProps } from '@/utilities/data/types';
import { storyblokInit, apiPlugin, StoryblokStory } from '@storyblok/react/rsc';
import { components as Components } from '@/utilities/storyblok';
import { resolveRelations } from '@/utilities/resolveRelations';
import { notFound } from 'next/navigation';
import { ComponentNotFound } from '@/components/Storyblok/ComponentNotFound';
import { getStoryData } from '@/utilities/data/getStoryData';

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
storyblokInit({
  accessToken: process.env.STORYBLOK_PREVIEW_EDITOR_TOKEN, // Preview token because this is in server side.
  use: [apiPlugin],
  components: Components,
  enableFallbackComponent: true,
  customFallbackComponent: (component) => {
    return <ComponentNotFound component={component} />;
  },
});

/**
 * Validate the editor token.
 *
 */
const validateEditor = (searchParams: PageProps['searchParams']) => {

  // See if the token is in the query string matches the one in the environment.
  const queryAccessToken = searchParams['access_key'];
  const validationToken = process.env.STORYBLOK_PREVIEW_EDITOR_TOKEN;

  if (queryAccessToken === validationToken) {
    return true;
  }

  // Something didn't work out.
  return false;
};

/**
 * Fetch the path data for the page and render it.
 */
export default async function Page({ searchParams }: PageProps) {

  // Not a valid editor token.
  if (!validateEditor(searchParams)) {
    console.error('Invalid editor token');
    notFound();
  }

  const slug = searchParams.path.replace(/\/$/, '');

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
