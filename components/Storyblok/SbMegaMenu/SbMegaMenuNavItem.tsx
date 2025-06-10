import { type SbBlokData, storyblokEditable } from '@storyblok/react';
import { SbLink } from '../partials/SbLink';
import { type SbLinkType } from '../Storyblok.types';
import * as styles from './SbMegaMenu.styles';

export type SbMegaMenuNavItemProps = {
  blok: SbBlokData & {
    link?: SbLinkType;
    linkText?: string;
  };
};

export const SbMegaMenuNavItem = (props:SbMegaMenuNavItemProps) => (
  <li {...storyblokEditable(props.blok)} className={`ood-mega-nav__item ${styles.MegaMenuNavItem}`}>
    <SbLink
      link={props.blok.link}
      classes={`ood-mega-nav__link ${styles.MegaMenuNavLevel1Cta}`}
      externalClasses="su-link--external"
      activeClass="ood-mega-nav__link--active"
    >
      {props.blok.linkText}
    </SbLink>
  </li>
);
