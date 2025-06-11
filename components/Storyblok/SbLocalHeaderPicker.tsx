import { CreateStories } from '../CreateStories';
import { type ISbStoryData } from '@storyblok/react/rsc';

export type SbLocalHeaderPickerProps = {
  blok: {
    localHeader?: ISbStoryData[];
  }
};

export const SbLocalHeaderPicker = (props: SbLocalHeaderPickerProps) => (
  <CreateStories stories={props.blok.localHeader} />
);
