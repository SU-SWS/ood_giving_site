'use client';
import React from 'react';
import { type SbBlokData, storyblokEditable } from '@storyblok/react';
import { useWindowSize } from 'usehooks-ts';
import { CenteredContainer } from '@/components/Storyblok/partials/CenteredContainer';
import { Heading } from '@/components/Typography';
import { CreateBloks } from '@/components/CreateBloks';
import { config } from '@/utilities/config';

export type HeaderMinimalProps = {
  blok: SbBlokData & {
    contentMenu: SbBlokData[];
    title?: string;
    headerSpacingBottom?: string;
    headerBackgroundColor?: string;
    layout?: string;
  }
};

/* The Header Minimal component is referenced by the Interior Page type. */
export const HeaderMinimal = (props: HeaderMinimalProps) => {
  const windowSize = useWindowSize();

  return (
    <header
      {...storyblokEditable(props.blok)}
      className={`ood-interior-page__header ood-interior-page__header--minimal su-text-white
            su-bg-${props.blok.headerBackgroundColor}
            ${
              props.blok.headerSpacingBottom !== 'none'
                ? `su-mb-${props.blok.headerSpacingBottom}`
                : ''
            }`}
    >
      <CenteredContainer flex={true}>
        {windowSize.width < config.breakpoints.lg &&
          props.blok.layout !== 'no-sidebar' && (
            <CreateBloks blokSection={props.blok.contentMenu} />
          )}
        <Heading
          as="h1"
          align="center"
          className="ood-interior-page__title"
        >
          {props.blok.title}
        </Heading>
      </CenteredContainer>
    </header>
  );
};
