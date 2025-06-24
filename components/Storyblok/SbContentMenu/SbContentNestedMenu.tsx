import { type SbBlokData, storyblokEditable } from '@storyblok/react/rsc';
import { CreateBloks } from '@/components/CreateBloks';
import * as styles from './SbContentMenu.styles';

/**
 * This component renders a nested menu that can be added to the content menu parent item.
 * This nested menu can be 2nd or 3rd level.
 */
export type SbContentNestedMenuProps = {
  blok: SbBlokData & {
    menuItems?: SbBlokData[];
    menuLevel?: styles.MenuLevelType;
  };
  slug?: string;
};

export const SbContentNestedMenu = ({ blok, slug }: SbContentNestedMenuProps) => {
  const { menuItems, menuLevel } = blok;

  return (
    <ul className={styles.nestedMenu(menuLevel)} {...storyblokEditable(blok)}>
      <CreateBloks blokSection={menuItems} slug={slug} />
    </ul>
  );
};
