// Create nested components in Storyblok

import React from "react"
import Components from "../components/components"

const CreateBloks = (props) => {
  if (props.blokSection) {
    return (
      props.blokSection.map((blok) => React.createElement(Components(blok.component), {
        key: blok._uid,
        blok: blok
      }))
    )
  }

  // Return null if no content provided.
  return null;
};

export default CreateBloks
