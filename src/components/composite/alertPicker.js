import React from 'react';
import CreateStories from '../../utilities/createStories';

const AlertPicker = (props) => {
  return <CreateStories stories={props.blok.alert} />;
};

export default AlertPicker;
