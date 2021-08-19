import React from "react";
import CreateStories from "../../../utilities/createStories";

const ContentMenuPicker = (props) => (
  <CreateStories stories={props.blok.contentMenu} />
);

export default ContentMenuPicker;
