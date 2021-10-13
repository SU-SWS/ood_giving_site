import React from 'react';
import CreateStories from '../../utilities/createStories';

const LocalHeaderPicker = (props) => {
  return <CreateStories stories={props.blok.localHeader} />;
};

export default LocalHeaderPicker;
