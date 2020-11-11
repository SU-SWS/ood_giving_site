import React from 'react'
import CreateStories from "../../utilities/createStories"

const LocalFooterPicker = (props) => {
  return (
    <CreateStories stories={props.blok.localFooter} />
  )
}

export default LocalFooterPicker
