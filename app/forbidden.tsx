import { StoryblokProvider } from '@/components/StoryblokProvider';
import { StoryblokStory } from '@storyblok/react/rsc';
import { resolveRelations } from '@/utilities/resolveRelations';
import { getStoryDataCached } from '@/utilities/data';
import { ensureStoryblokInitialized } from '@/utilities/storyblok';

export const dynamic = 'force-static';

// Storyblok bridge options.
const bridgeOptions = {
  resolveRelations,
  resolveLinks: 'story',
};

/**
 * Get the story data from the Storyblok API through the cache.
 */
const Forbidden = async () => {
  await ensureStoryblokInitialized();
  const { data } = await getStoryDataCached({ path: '403-page-access-denied' });

  if (data === 404) {
    return (
      <>
        <h1>Error: Access Denied</h1>
        <p>Slug <code><strong>403-page-access-denied</strong></code> could not be found in the CMS.</p>
      </>
    );
  }

  return (
    <StoryblokProvider>
      <StoryblokStory story={data.story} bridgeOptions={bridgeOptions} />
    </StoryblokProvider>
  );
};

export default Forbidden;
