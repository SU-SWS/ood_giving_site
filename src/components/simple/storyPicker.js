import React from 'react'
import SbEditable from 'storyblok-react'
import Components from "../components";

const StoryPicker = (props) => {
  return (
    <SbEditable content={props.blok}>
      {props.blok.story && props.blok.story.map((story) => React.createElement(Components(story.content.component), {
        key: story.content._uid,
        blok: story.content,
        layout: "story-card",
        orientation: props.blok.orientation,
        hideimage: props.blok.hideImage,
      }))}
    </SbEditable>
  )
}

export default StoryPicker