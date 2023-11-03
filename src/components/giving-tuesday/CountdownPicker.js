import React from 'react';

import CreateStories from '../../utilities/createStories';

const CountdownPicker = (props) => {
  return <CreateStories stories={props.blok.countdown} />;
};

export default CountdownPicker;
