import { CreateStories } from '../CreateStories';
import { type ISbStoryData } from '@storyblok/react/rsc';

type SbLocalHeaderPickerProps = {
  blok: {
    localHeader?: ISbStoryData[];
  };
  slug?: string;
};

export const SbLocalHeaderPicker = (props: SbLocalHeaderPickerProps) => (
  <CreateStories stories={props.blok.localHeader} slug={props.slug} />
);
