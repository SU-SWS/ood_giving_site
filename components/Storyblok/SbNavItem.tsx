import React from 'react';
import { type SbBlokData, storyblokEditable } from '@storyblok/react/rsc';
import { SbLink } from '@/components/Storyblok/partials/SbLink';
import { type SbLinkType } from './Storyblok.types';

export type SbNavItemProps = {
  blok: SbBlokData & {
    link?: SbLinkType;
    linkTextLabel?: string;
  };
};

export const SbNavItem = (props: SbNavItemProps) => (
  <li {...storyblokEditable(props.blok)}>
    <SbLink
      link={props.blok.link}
      activeClass={'active'}
      externalClasses={'su-link--external'}
    >
      {props.blok.linkTextLabel}
    </SbLink>
  </li>
);
