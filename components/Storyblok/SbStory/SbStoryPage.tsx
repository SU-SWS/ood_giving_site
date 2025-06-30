import React from 'react';
import { SbStoryCardView, type SbStoryCardViewProps } from './SbStoryCardView';
import { SbStory, type SbStoryProps } from './SbStory';

export type SbStoryPageProps = SbStoryCardViewProps & SbStoryProps & {
  layout?: string;
};

export const SbStoryPage = (props: SbStoryPageProps) => {
  if (props.layout === 'story-card') {
    return <SbStoryCardView {...props} />;
  }
  return <SbStory {...props} />;
};
