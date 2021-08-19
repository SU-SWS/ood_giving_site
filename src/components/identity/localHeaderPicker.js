import React from "react";
import CreateStories from "../../utilities/createStories";

const LocalHeaderPicker = (props) => (
  <CreateStories stories={props.blok.localHeader} />
);

export default LocalHeaderPicker;
