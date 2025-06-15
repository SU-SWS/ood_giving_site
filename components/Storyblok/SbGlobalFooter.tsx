import { GlobalFooter } from '@/components/GlobalFooter';
import { SbBlokData, storyblokEditable } from '@storyblok/react/rsc';

export type SbGlobalFooterProps = {
  blok: SbBlokData & {
    color?: string;
  }
};

// TODO: Fix custom bg colors
export const SbGlobalFooter = (props: SbGlobalFooterProps) => (
  <GlobalFooter {...storyblokEditable(props.blok)} />
);
