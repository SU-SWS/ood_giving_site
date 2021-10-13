import React from 'react';
import CreateStories from '../../../utilities/createStories';

const StoryPicker = (props) => {
  return (
    <CreateStories
      stories={props.blok.story}
      layout={'story-card'}
      orientation={props.blok.orientation}
      hideImage={props.blok.hideImage}
      backgroundColor={props.blok.backgroundColor}
      headingLevel={props.blok.headingLevel}
      visibleHorizontal={props.blok.visibleHorizontal}
      visibleVertical={props.blok.visibleVertical}
    />
  );
};

export default StoryPicker;
