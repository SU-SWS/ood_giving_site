'use client';

import { useSearchParams } from 'next/navigation';
import { StoryblokComponent, useStoryblok } from '@storyblok/react';
import { resolveRelations } from '@/utilities/resolveRelations';
import { Grid } from '@/components/Grid';

/**
 * Client component for Storyblok editor interface.
 * Separated from server validation logic for Next.js 16 compatibility.
 */
export default function EditorClient() {
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
}
