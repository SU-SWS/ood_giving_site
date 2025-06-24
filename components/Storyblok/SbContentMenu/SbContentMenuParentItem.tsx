import { type SbBlokData, storyblokEditable } from '@storyblok/react/rsc';
import { CtaLink } from '@/components/Cta/CtaLink';
import { CreateBloks } from '@/components/CreateBloks';
import { SbLinkType } from '@/components/Storyblok/Storyblok.types';
import { isActiveLink } from '@/utilities/isActiveLink';
import * as styles from './SbContentMenu.styles';

/**
 * This component renders a parent link in the content menu that has a nested menu.
 * It can be a top level or 2nd level item.
 */
export type SbContentMenuParentItemProps = {
  blok: SbBlokData & {
    parentItemText?: string;
    parentItemLink?: SbLinkType;
    nestedMenu?: SbBlokData[];
  };
  slug?: string;
};

export const SbContentMenuParentItem = ({ blok, slug }: SbContentMenuParentItemProps) => {
  const { parentItemText, parentItemLink, nestedMenu } = blok;

  if (!parentItemText || !parentItemLink.cached_url) {
    return null;
  }

  const isActivePage = isActiveLink(slug, parentItemLink.cached_url);

  return (
    <li className={styles.parentItem} {...storyblokEditable(blok)}>
      <CtaLink
        sbLink={parentItemLink}
        variant="content-menu"
        aria-current={isActivePage ? 'page' : undefined}
      >
        {parentItemText}
      </CtaLink>
      <CreateBloks blokSection={nestedMenu} />
    </li>
  );
};
