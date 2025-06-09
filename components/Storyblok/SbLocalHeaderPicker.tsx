import { CreateStories } from '../CreateStories';
import { type ISbStoryData } from '@storyblok/react';

export type SbLocalHeaderPickerProps = {
  blok: {
    localHeader?: ISbStoryData[];
  }
};

export const SbLocalHeaderPicker = (props: SbLocalHeaderPickerProps) => (
  <CreateStories stories={props.blok.localHeader} />
);
