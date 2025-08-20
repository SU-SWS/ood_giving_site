'use client';

import { useEffect, useState } from 'react';
import { notFound, useSearchParams } from 'next/navigation';
import { StoryblokComponent } from '@storyblok/react';
import { resolveRelations } from '@/utilities/resolveRelations';
import { Grid } from '@/components/Grid';
import { getStoryblokClient } from '@/utilities/storyblok';

// type PageSearchParams = {
//   access_key: string;
//   path: string;
//   _storyblok: string; // ID of space (eg: 1005200)
//   _storyblok_c: string;
//   _storyblok_version: string;
//   _storyblok_lang: string;
//   _storyblok_release: string; // number as a string eg: '0'
//   _storyblok_rl: string; // eg: '1698435696245'
//   '_storyblok_tk[space_id]': string; // eg: '1005200'
//   '_storyblok_tk[timestamp]': string; // eg: '1698435695'
//   '_storyblok_tk[token]': string; // eg: '654efea80d36a0b2bas3640ea937b0e0d4cc0234'
// };

/**
 * Fetch the path data for the page and render it.
 */
const Page = () => {
  const searchParams = useSearchParams();
  const path = searchParams.get('path');
  const accessToken = searchParams.get('access_key');
  const storyblokApi = getStoryblokClient({ accessToken, isEditor: true });
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const response = await storyblokApi.get(
          `cdn/stories/${path}`,
          {
            version: 'draft',
            resolve_relations: resolveRelations,
            resolve_links: 'story',
          },
        );
        setData(response.data);
        setIsLoading(false);
      } catch(err) {
        console.log(err);
        setData(null);
        setIsLoading(false);
      }
    };

    if (path && accessToken) {
      getData();
    } else {
      setIsLoading(false);
    }
  }, [storyblokApi, path, accessToken]);

  console.log({ accessToken, path, isLoading, data });

  if (isLoading) {
    return (
      <Grid gap="default" mt={10} mb={10} className="cc bg-white animate-[skeleton_2s_linear_infinite]">
        <div className="w-full h-300 bg-black-10" />
        <div className="w-full h-300 bg-black-10" />
      </Grid>
    );
  }

  if (!data) {
    notFound();
  }

  // Return the story.
  return (
    <StoryblokComponent
      blok={data}
    />
  );
};

export default Page;
