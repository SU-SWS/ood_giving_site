// Process image using the Storyblok image service
// See all the "param" options on the website
// https://www.storyblok.com/docs/image-service

import React from "react"
import Components from "../components/components"

const CreateBloks = (blokSection) => {
  if (blokSection) {
    return (
      blokSection.map((blok) => React.createElement(Components(blok.component), {
        key: blok._uid,
        blok: blok
      }))
    )
  }
};

export default CreateBloks
