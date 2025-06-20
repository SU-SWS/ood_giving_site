import { type SbBlokData, storyblokEditable } from '@storyblok/react/rsc';
// import { CreateBloks } from '@/components/CreateBloks';

/**
 * This component renders a nested menu that can be added to the content menu parent item.
 * This nested menu can be 2nd or 3rd level.
 */
export type SbContentNestedMenuProps = {
  blok: SbBlokData & {
    menuItems?: SbBlokData[];
    menuLevel?: 'lv2' | 'lv3';
  };
  slug?: string;
};

export const SbContentNestedMenu = ({ blok }: SbContentNestedMenuProps) => {
  return (
    <div {...storyblokEditable(blok)}></div>
  );
};
