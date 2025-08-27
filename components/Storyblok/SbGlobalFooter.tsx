import { GlobalFooter, type FooterColorType } from '@/components/GlobalFooter';
import { SbBlokData, storyblokEditable } from '@storyblok/react/rsc';

export type SbGlobalFooterProps = {
  blok: SbBlokData & {
    color?: FooterColorType;
  }
};

export const SbGlobalFooter = ({ blok }: SbGlobalFooterProps) => (
  <GlobalFooter color={blok.color || 'cardinal-red'} {...storyblokEditable(blok)} />
);
