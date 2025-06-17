import { type SbBlokData, storyblokEditable } from '@storyblok/react/rsc';
import { CtaLink } from '@/components/Cta';
import { type SbLinkType } from '../Storyblok.types';
import * as styles from './SbMegaMenu.styles';

/**
 * This is only used for the top-level mega menu links.
 * Even though the links in the individual mega menu panels use this same Storyblok component,
 * they are not rendered with this component.
 * See `SbMegaMenuLinkGroup` for the links in the mega menu panels.
 */
export type SbMegaMenuNavItemProps = {
  blok: SbBlokData & {
    link?: SbLinkType;
    linkText?: string;
  };
  slug?: string;
};

export const SbMegaMenuNavItem = ({ blok, slug }: SbMegaMenuNavItemProps) => {
  const { link, linkText } = blok;
  const isActivePage = slug === link?.cached_url;

  return (
    <li {...storyblokEditable(blok)} className={styles.navItem}>
      <CtaLink
        sbLink={link}
        variant="mega-menu"
        icon="su-link--action"
        iconProps={{ className: styles.navItemChevron }}
        className={isActivePage && 'before:bg-black before:hocus:bg-digital-red lg:before:bg-black-40 before:scale-y-100 lg:before:scale-x-100'}
      >
        {linkText}
      </CtaLink>
    </li>
  );
};
