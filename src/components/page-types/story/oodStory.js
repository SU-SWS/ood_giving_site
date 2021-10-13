import React from 'react';
import StoryCardView from './oodStoryCardView';
import StoryFullView from './oodStoryFullView';

const OodStory = (props) => {
  if (props.layout === 'story-card') {
    return <StoryCardView {...props} />;
  }
  return <StoryFullView {...props} />;
};

export default OodStory;
