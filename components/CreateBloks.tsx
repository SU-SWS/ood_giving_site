import { StoryblokServerComponent, type SbBlokData } from '@storyblok/react/rsc';

type CreateBloksProps = {
  blokSection: SbBlokData[];
  [k: string]: unknown;
};

export const CreateBloks = ({ blokSection, ...props }: CreateBloksProps) => {
  if (blokSection) {
    return blokSection.map((blok) => <StoryblokServerComponent key={blok._uid} blok={blok} {...props} />);
  }

  // Return null if no content provided.
  return null;
};
