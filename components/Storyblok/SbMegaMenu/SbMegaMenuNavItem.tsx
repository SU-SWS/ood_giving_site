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
  if (!link.cached_url || !linkText) {
    return null;
  }
  // Remove any trailing and leading slashes from the cached URL and slug
  const sanitizedUrl = link?.cached_url.replace(/^\/|\/$/g, '');
  const sanitizedSlug = slug?.replace(/^\/|\/$/g, '');
  const isActivePage = sanitizedSlug === sanitizedUrl;

  return (
    <li {...storyblokEditable(blok)} className={styles.navItem}>
      <CtaLink
        sbLink={link}
        variant="mega-menu"
        icon="su-link--action"
        iconProps={{ className: styles.navItemChevron }}
        aria-current={isActivePage ? 'page' : undefined}
        className={isActivePage && styles.topLevelLinkActive}
      >
        {linkText}
      </CtaLink>
    </li>
  );
};
