import { CreateStories } from '../../CreateStories';
import { type ISbStoryData } from '@storyblok/react/rsc';

export type SbEndowedPositionsSearchPickerProps = {
  blok: {
    endowedPositionsSearch?: ISbStoryData[];
  };
};

export const SbEndowedPositionsSearchPicker = (props: SbEndowedPositionsSearchPickerProps) => (
  <CreateStories stories={props.blok.endowedPositionsSearch} />
);
