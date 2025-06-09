import React from 'react';
import { CreateStories } from '@/components/CreateStories';
import { type ISbStoryData } from '@storyblok/react';

export type SbLocalFooterPickerProps = {
  blok: {
    localFooter?: ISbStoryData[];
  }
}

export const SbLocalFooterPicker = (props: SbLocalFooterPickerProps) => {
  return <CreateStories stories={props.blok.localFooter} />;
};
