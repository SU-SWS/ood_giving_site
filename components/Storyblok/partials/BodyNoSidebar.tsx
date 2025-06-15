import React from 'react';
import { type SbBlokData, storyblokEditable } from '@storyblok/react/rsc';
import { CreateBloks } from '@/components/CreateBloks';
import { FlexCell } from '@/components/Storyblok/partials/FlexCell';

export type BodyNoSidebarProps = {
  blok: SbBlokData & {
    pageContent: SbBlokData[];
  }
};

export const BodyNoSidebar = (props: BodyNoSidebarProps) => (
  <FlexCell
    {...storyblokEditable(props.blok)}
    lg={10}
    xl={8}
    className="ood-interior-page__body-content su-mx-auto"
  >
    <CreateBloks blokSection={props.blok.pageContent} />
  </FlexCell>
);
