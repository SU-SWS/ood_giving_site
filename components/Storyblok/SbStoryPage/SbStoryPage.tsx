import React from 'react';
import { SbStoryCardView, type SbStoryCardViewProps } from './SbStoryCardView';
import { SbStoryFullView, type SbStoryFullViewProps } from './SbStoryFullView';

export type SbStoryPageProps = SbStoryCardViewProps & SbStoryFullViewProps & {
  layout?: string;
};

export const SbStoryPage = (props: SbStoryPageProps) => {
  if (props.layout === 'story-card') {
    return <SbStoryCardView {...props} />;
  }
  return <SbStoryFullView {...props} />;
};
