import { CreateStories } from '../../CreateStories';
import { type ISbStoryData } from '@storyblok/react/rsc';

export type SbAlertPickerProps = {
  blok: {
    alert?: ISbStoryData[];
  };
};

export const SbAlertPicker = (props: SbAlertPickerProps) => (
  <CreateStories stories={props.blok.alert} />
);
