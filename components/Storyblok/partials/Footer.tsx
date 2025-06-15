import React from 'react';
import { type SbBlokData } from '@storyblok/react/rsc';
import { storyblokEditable } from '@storyblok/react/rsc';
import { CreateBloks } from '@/components/CreateBloks';

export type FooterProps = {
  blok: SbBlokData & {
    localFooter: SbBlokData[];
    globalFooter: SbBlokData[];
  }
}

/*
 * The footer component is referenced and used in all page-type components.
 * It incorporates the local footer and global footer, based on page settings.
 */
export const Footer = (props: FooterProps) => (
  <footer {...storyblokEditable(props.blok)}>
    <CreateBloks blokSection={props.blok.localFooter} />
    <CreateBloks blokSection={props.blok.globalFooter} />
  </footer>
);
