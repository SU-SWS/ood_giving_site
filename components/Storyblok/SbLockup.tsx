import React from 'react';
import { type SbBlokData, storyblokEditable } from '@storyblok/react';
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
      className="scale-125 origin-left sm:scale-100 text-[1.67em] md:text-[1.72em] lg:text-[1.9em]"
    />
  </div>
);
