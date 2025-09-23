'use client';

import { useSearchParams } from 'next/navigation';
import { StoryblokComponent, useStoryblok } from '@storyblok/react';
import { resolveRelations } from '@/utilities/resolveRelations';
import { Grid } from '@/components/Grid';

// Force dynamic rendering for editor preview functionality
export const dynamic = 'force-dynamic';

/**
 * Fetch the path data for the page and render it.
 */
const Page = () => {
  const searchParams = useSearchParams();
  const path = searchParams.get('path');
  const story = useStoryblok(
    path,
    {
      version: 'draft',
      resolve_relations: resolveRelations,
      resolve_links: 'story',
    },
    {
      resolveRelations,
      preventClicks: true,
      resolveLinks: 'story',
    },
  );

  if (!story?.content) {
    return (
      <Grid gap="default" mt={10} mb={10} className="cc bg-white animate-[skeleton_2s_linear_infinite]">
        <div className="w-full h-300 bg-black-10" />
        <div className="w-full h-300 bg-black-10" />
      </Grid>
    );
  }

  // Return the story.
  return (
    <StoryblokComponent
      blok={story.content}
      slug={story.full_slug}
      name={story.name}
    />
  );
};

export default Page;
