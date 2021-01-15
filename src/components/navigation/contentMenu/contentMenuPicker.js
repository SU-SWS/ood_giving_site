import React from 'react'
import CreateStories from "../../../utilities/createStories"

const ContentMenuPicker = (props) => {
  return (
    <CreateStories stories={props.blok.contentMenu} />
  )
}

export default ContentMenuPicker
