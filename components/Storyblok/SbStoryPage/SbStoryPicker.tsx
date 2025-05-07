import React from 'react';
import { CreateStories } from '@/components/CreateStories';
import { type ISbStoryData, type SbBlokData } from '@storyblok/react';

export type SbStoryPickerProps = {
  blok: SbBlokData[] & {
    story: ISbStoryData[];
    orientation?: unknown;
    hideImage?: unknown;
    backgroundColor?: unknown;
    headingLevel?: unknown;
    visibleHorizontal?: unknown;
    visibleVertical?: unknown;
  };
};

export const SbStoryPicker = (props: SbStoryPickerProps) => {
  return (
    <CreateStories
      stories={props.blok.story}
      layout={'story-card'}
      orientation={props.blok.orientation}
      hideImage={props.blok.hideImage}
      backgroundColor={props.blok.backgroundColor}
      headingLevel={props.blok.headingLevel}
      visibleHorizontal={props.blok.visibleHorizontal}
      visibleVertical={props.blok.visibleVertical}
    />
  );
};
