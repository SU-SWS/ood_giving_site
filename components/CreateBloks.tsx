import { StoryblokServerComponent, type SbBlokData } from '@storyblok/react/rsc';
import { getNumBloks } from '@/utilities/getNumBloks';

type CreateBloksProps = {
  blokSection?: SbBlokData[];
  isListItems?: boolean;
  [k: string]: unknown;
};

export const CreateBloks = ({ blokSection, isListItems, ...props }: CreateBloksProps) => {
  const hasContent = !!getNumBloks(blokSection);
  if (!hasContent) return null;

  if (isListItems) {
    return blokSection.map((blok) => <li key={blok._uid}><StoryblokServerComponent blok={blok} {...props} /></li>);
  }

  return blokSection.map((blok) => <StoryblokServerComponent key={blok._uid} blok={blok} {...props} />);
};
