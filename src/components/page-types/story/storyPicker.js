import React from 'react'
import SbEditable from 'storyblok-react'
import Components from "../../components";
import CreateStories from "../../../utilities/createStories"

const StoryPicker = (props) => {
  return (
    <SbEditable content={props.blok}>
      <CreateStories stories={props.blok.story}
                     layout={"story-card"}
                     orientation={props.blok.orientation}
                     hideImage={props.blok.hideImage}
                     backgroundColor={props.blok.backgroundColor}
                     headingLevel={props.blok.headingLevel}
                     visibleHorizontal={props.blok.visibleHorizontal}
                     visibleVertical={props.blok.visibleVertical}
      />
    </SbEditable>
  )
}

export default StoryPicker
