import React from 'react';
import { StoryblokProvider } from '@/components/StoryblokProvider';
import { StoryblokStory } from '@storyblok/react/rsc';
import { resolveRelations } from '@/utilities/resolveRelations';
import { getStoryDataCached } from '@/utilities/data';

export const dynamic = 'force-static';

// Storyblok bridge options.
const bridgeOptions = {
  resolveRelations,
  resolveLinks: 'story',
};

/**
 * Get the story data from the Storyblok API through the cache.
 */
const PageNotFound = async () => {
  const { data } = await getStoryDataCached({ path: '404-page-page-not-found' });

  if (data === 404) {
    return (
      <>
        <h1>Error: Could not find page</h1>
        <p>Slug <code><strong>404-page-page-not-found</strong></code> could not be found in the CMS.</p>
      </>
    );
  }

  return (
    <StoryblokProvider>
      <StoryblokStory story={data.story} bridgeOptions={bridgeOptions} />
    </StoryblokProvider>
  );
};

export default PageNotFound;
