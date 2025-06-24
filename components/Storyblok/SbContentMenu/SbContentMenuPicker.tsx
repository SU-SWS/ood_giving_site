import { CreateStories } from '@/components/CreateStories';
import { type ISbStoryData } from '@storyblok/react/rsc';

export type SbLocalFooterPickerProps = {
  blok: {
    contentMenu?: ISbStoryData[];
  };
  slug?: string;
}

export const SbContentMenuPicker = ({ blok, slug }: SbLocalFooterPickerProps) => {
  const { contentMenu } = blok;

  return <CreateStories stories={contentMenu} slug={slug} />;
};
