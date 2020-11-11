import React from 'react'
import SbEditable from 'storyblok-react'
import CreateStories from "../../utilities/createStories"

const LocalFooterPicker = (props) => {
  return (
    <SbEditable content={props.blok}>
      <CreateStories stories={props.blok.localFooter} />
    </SbEditable>
  )
}

export default LocalFooterPicker
