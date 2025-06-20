import { CreateStories } from '@/components/CreateStories';
import { type ISbStoryData } from '@storyblok/react/rsc';

export type SbGlobalFooterPickerProps = {
  blok: {
    globalFooter: ISbStoryData[];
  }
}

export const SbGlobalFooterPicker = (props: SbGlobalFooterPickerProps) => (
  <CreateStories stories={props.blok.globalFooter} />
);
