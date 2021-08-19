import React from "react";
import CreateStories from "../../utilities/createStories";

const GlobalFooterPicker = (props) => (
  <CreateStories stories={props.blok.globalFooter} />
);

export default GlobalFooterPicker;
