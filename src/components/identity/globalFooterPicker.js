import React from 'react'
import SbEditable from 'storyblok-react'
import CreateStories from "../../utilities/createStories"

const GlobalFooterPicker = (props) => {
  return (
    <SbEditable content={props.blok}>
      <CreateStories stories={props.blok.globalFooter} />
    </SbEditable>
  )
}

export default GlobalFooterPicker
