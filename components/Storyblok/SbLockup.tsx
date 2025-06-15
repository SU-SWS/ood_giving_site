import React from 'react';
import { type SbBlokData, storyblokEditable } from '@storyblok/react/rsc';
import { type SbLinkType } from './Storyblok.types';
import { LogoLockup } from '@/components/Logo';

export type SbLockupProps = {
  blok: SbBlokData & {
    link?: SbLinkType;
    lineOne?: string;
  };
};

export const SbLockup = (props: SbLockupProps) => (
  <div {...storyblokEditable(props.blok)} className="su-lockup su-lockup--option-n">
    <LogoLockup
      isLink
      text="Giving"
      className="origin-left scale-[175%]"
    />
  </div>
);
