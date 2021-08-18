import React from "react";
import Components from "../components/components";

// Create nested components in Storyblok

const CreateBloks = (props) => {
  if (props.blokSection) {
    return props.blokSection.map((blok) =>
      React.createElement(Components(blok.component), {
        key: blok._uid,
        blok: blok,
        ...props,
      })
    );
  }

  // Return null if no content provided.
  return null;
};

export default CreateBloks;
