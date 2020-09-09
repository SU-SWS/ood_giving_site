import React from 'react'
import SbEditable from 'storyblok-react'
import Components from "../components";

const LocalHeaderPicker = (props) => {
  return (
    <SbEditable content={props.blok}>
      {props.blok.localHeader && props.blok.localHeader.map((story) => React.createElement(Components(story.content.component), {
        key: story.content._uid,
        blok: story.content,
      }))}
    </SbEditable>
  )
}

export default LocalHeaderPicker