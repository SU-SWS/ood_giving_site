import React from 'react';
import { CreateStories } from '@/components/CreateStories';
import { type ISbStoryData } from '@storyblok/react';

type GlobalFooterPickerProps = {
  blok: {
    globalFooter: ISbStoryData[];
  }
}

export const GlobalFooterPicker = (props: GlobalFooterPickerProps) => (
  <CreateStories stories={props.blok.globalFooter} />
);
