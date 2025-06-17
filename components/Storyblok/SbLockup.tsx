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
  <div {...storyblokEditable(props.blok)}>
    <LogoLockup isLink text="Giving" />
  </div>
);
