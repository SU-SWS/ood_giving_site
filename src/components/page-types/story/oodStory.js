import React from 'react'
import StoryCardView from "./oodStoryCardView";
import StoryFullView from "./oodStoryFullView";

const OodStory = (props) => {
  if (props.layout === "story-card") {
    return (
      <StoryCardView {...props} />
    )
  }
  else {
    return (
      <StoryFullView {...props} />
    )
  }
};

export default OodStory
