import { type SbBlokData, storyblokEditable } from '@storyblok/react/rsc';
import { SbLinkType } from '@/components/Storyblok/Storyblok.types';

export type SbContentNavItemProps = {
  blok: SbBlokData & {
    link?: SbLinkType;
    linkText?: string;
  };
  slug?: string;
};

export const SbContentNavItem = ({ blok }: SbContentNavItemProps) => {
  return (
    <div {...storyblokEditable(blok)}></div>
  );
};
