import React from 'react';
import { type SbBlokData, storyblokEditable } from '@storyblok/react';
import { CreateBloks } from '@/components/CreateBloks';

export type BelowContentProps = {
  blok: SbBlokData & {
    belowContent: SbBlokData[];
  }
};

/* The BelowContent component is referenced by the Interior Page and Support page types. */
export const BelowContent = (props: BelowContentProps) => (
  <div {...storyblokEditable(props.blok)}>
    {props.blok.belowContent != null &&
      Object.keys(props.blok.belowContent).length > 0 && (
        <div className="ood-interior-page__below-body">
          <CreateBloks blokSection={props.blok.belowContent} />
        </div>
      )}
  </div>
);
