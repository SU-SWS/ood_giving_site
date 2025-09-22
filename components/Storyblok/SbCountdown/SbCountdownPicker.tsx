import { CreateStories } from '../../CreateStories';
import { type ISbStoryData } from '@storyblok/react/rsc';

export type SbCountdownPickerProps = {
  blok: {
    countdown?: ISbStoryData[];
  };
};

export const SbCountdownPicker = (props: SbCountdownPickerProps) => (
  <CreateStories stories={props.blok.countdown} />
);
