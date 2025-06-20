import { type SbBlokData, storyblokEditable } from '@storyblok/react/rsc';
// import { CreateBloks } from '@/components/CreateBloks';
import { SbLinkType } from '@/components/Storyblok/Storyblok.types';

/**
 * This component renders a parent link in the content menu that has a nested menu.
 * It can be a top level or 2nd level item.
 */
export type SbContentMenuParentItemProps = {
  blok: SbBlokData & {
    parentitemText?: string;
    parentItemLink?: SbLinkType;
    nestedMenu?: SbBlokData[];
  };
  slug?: string;
};

export const SbContentMenuParentItem = ({ blok }: SbContentMenuParentItemProps) => {
  return (
    <div {...storyblokEditable(blok)}></div>
  );
};
