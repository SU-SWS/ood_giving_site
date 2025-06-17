import { type SbBlokData, storyblokEditable } from '@storyblok/react/rsc';
import { SbLink } from '../partials/SbLink';
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
};

export const SbMegaMenuNavItem = (props:SbMegaMenuNavItemProps) => {
  const { link, linkText } = props.blok;

  return (
    <li {...storyblokEditable(props.blok)} className={styles.navItem}>
      <CtaLink
        sbLink={link}
        variant="mega-menu"
      >
        {linkText}
      </CtaLink>
    </li>
  );
};
