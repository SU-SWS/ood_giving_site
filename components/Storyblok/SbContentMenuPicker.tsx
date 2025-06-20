import { CreateStories } from '@/components/CreateStories';
import { type ISbStoryData } from '@storyblok/react/rsc';

export type SbLocalFooterPickerProps = {
  blok: {
    contentMenu?: ISbStoryData[];
  }
}

export const SbContentMenuPicker = (props: SbLocalFooterPickerProps) => {
  return <CreateStories stories={props.blok.contentMenu} />;
};
