import React from 'react';
import CreateStories from '../../utilities/createStories';

const GlobalFooterPicker = (props) => {
  return <CreateStories stories={props.blok.globalFooter} />;
};

export default GlobalFooterPicker;
