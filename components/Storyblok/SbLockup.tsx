import { type SbBlokData, storyblokEditable } from '@storyblok/react/rsc';
import { type SbLinkType } from './Storyblok.types';
import { LogoLockup, type LogoTextColorType } from '@/components/Logo';

export type SbLockupProps = {
  blok: SbBlokData & {
    link?: SbLinkType;
    lineOne?: string;
  };
  color?: LogoTextColorType;
};

export const SbLockup = ({ blok, color }: SbLockupProps) => {
  const { link, lineOne } = blok;

  return (
    <div {...storyblokEditable(blok)}>
      <LogoLockup link={link} text={lineOne || 'Giving'} color={color || 'default'} />
    </div>
  );
};
