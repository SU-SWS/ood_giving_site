import { type SbBlokData, storyblokEditable } from '@storyblok/react/rsc';
import { cnb } from 'cnbuilder';
import { CreateBloks } from '@/components/CreateBloks';

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

export const SbContentNestedMenu = ({ blok, slug }: SbContentNestedMenuProps) => {
  const { menuItems, menuLevel } = blok;
  return (
    <ul
      className={cnb('list-unstyled mb-04em *:pl-20 *:*:py-8 *:*:lg:py-12', menuLevel === 'lv2' ? '*:*:text-18' : '*:*:text-16')}
      {...storyblokEditable(blok)}
    >
      <CreateBloks blokSection={menuItems} slug={slug} />
    </ul>
  );
};
