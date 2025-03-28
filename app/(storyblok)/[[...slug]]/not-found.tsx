import React from 'react';
import StoryblokProvider from '@/components/StoryblokProvider';
import { StoryblokStory } from '@storyblok/react/rsc';
import { resolveRelations } from '@/utilities/resolveRelations';
import { getStoryDataCached } from '@/utilities/data/getStoryData';
import { getStoryblokApi } from '@/utilities/storyblok';

// Storyblok bridge options.
const bridgeOptions = {
  resolveRelations,
  resolveLinks: 'story',
};

/**
 * Init on the server.
 */
getStoryblokApi();

/**
 * Get the story data from the Storyblok API through the cache.
 */
export default async function PageNotFound() {
  const { data } = await getStoryDataCached({ path: 'page-not-found' });

  if (data === 404) {
    return (
      <>
        <h1>Error: Could not find page</h1>
        <p>Slug <code><b>page-not-found</b></code> could not be found in the CMS.</p>
      </>
    );
  }

  return (
    <StoryblokProvider>
      <StoryblokStory story={data.story} bridgeOptions={bridgeOptions} />
    </StoryblokProvider>
  );
}
