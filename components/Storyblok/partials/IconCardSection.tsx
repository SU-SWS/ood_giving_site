import React from 'react';
import { type SbBlokData } from '@storyblok/react/rsc';
import { storyblokEditable } from '@storyblok/react';
import { CreateBloks } from '@/components/CreateBloks';
import { Heading } from '@/components/Typography';
import { CenteredContainer } from '@/components/Storyblok/partials/CenteredContainer';

export type IconCardSectionProps = {
  blok: SbBlokData & {
    iconCards: SbBlokData[];
    iconCardHeading?: string;
  };
}

/*
 * The Icon Card Section component is referenced by the Interior Page, Landing Page, Story page, and Support page types.
 */
export const IconCardSection = (props: IconCardSectionProps) => {
  const numIconCards = props.blok.iconCards ? Object.keys(props.blok.iconCards).length : 0;

  if (numIconCards === 0) {
    return null;
  }

  return (
    <div {...storyblokEditable(props.blok)}>
      <Heading srOnly>
        {props.blok.iconCardHeading
          ? props.blok.iconCardHeading
          : 'Links to more information'}
      </Heading>
      <CenteredContainer
        flex={true}
        classes={`ood-icon-card-section__container su-align-items-stretch su-flex-${numIconCards}-col`}
      >
        <CreateBloks blokSection={props.blok.iconCards} />
      </CenteredContainer>
    </div>
  );
};
