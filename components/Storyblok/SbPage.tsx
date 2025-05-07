import React from 'react';
import { CreateBloks } from '../CreateBloks';
import { type SbBlokData } from '@storyblok/react';

type SbPageProps = {
  blok: SbBlokData & {
    body: SbBlokData[];
  }
};

// TODO DS-1417: Remove and clean this up after a quick check of SB
export const SbPage = (props: SbPageProps) => (
  <div className="page">
    <CreateBloks blokSection={props.blok.body} />
  </div>
);
