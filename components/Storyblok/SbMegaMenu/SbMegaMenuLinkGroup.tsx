import { type SbBlokData, storyblokEditable } from '@storyblok/react';
import { CreateBloks } from '@/components/CreateBloks';
import { FlexCell } from '@/components/Storyblok/partials/FlexCell';
import { Heading } from '../../Typography';
import * as styles from './SbMegaMenu.styles';

export type SbMegaMenuLinkGroupProps = {
  blok: SbBlokData & {
    heading?: string;
    links?: SbBlokData[];
  };
};

export const SbMegaMenuLinkGroup = (props: SbMegaMenuLinkGroupProps) => (
  <FlexCell {...storyblokEditable(props.blok)} md={4} className="ood-mega-nav__link-group mb-20 md:mb-0 empty:mb-0">
    {props.blok.heading && (
      <Heading font="sans" weight="bold" uppercase tracking="widest" className={`ood-mega-nav__link-group-heading ${styles.MegaMenuNavLinkGroupHeading}`}>
        {props.blok.heading}
      </Heading>
    )}
    {!!props.blok.links?.length && (
      <ul className="ood-mega-nav__menu-lv2 list-unstyled">
        <CreateBloks blokSection={props.blok.links} />
      </ul>
    )}
  </FlexCell>
);
