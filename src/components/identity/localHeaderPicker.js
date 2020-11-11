import React from 'react'
import SbEditable from 'storyblok-react'
import CreateStories from "../../utilities/createStories"

const LocalHeaderPicker = (props) => {
  return (
    <SbEditable content={props.blok}>
      <CreateStories stories={props.blok.localHeader} />
    </SbEditable>
  )
}

export default LocalHeaderPicker
