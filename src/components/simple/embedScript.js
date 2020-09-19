import React from 'react'
import SbEditable from "storyblok-react";

const EmbedScript = (props) => {
  return (
    <SbEditable content={props.blok}>
      <div
        dangerouslySetInnerHTML={{
          __html: props.blok.script,
        }}
      />
    </SbEditable>
  )
}

export default EmbedScript