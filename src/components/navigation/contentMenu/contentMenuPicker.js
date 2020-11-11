import React from 'react'
import SbEditable from 'storyblok-react'
import CreateStories from "../../../utilities/createStories"

const ContentMenuPicker = (props) => {
  return (
    <SbEditable content={props.blok}>
      <CreateStories stories={props.blok.contentMenu} />
    </SbEditable>
  )
}

export default ContentMenuPicker
