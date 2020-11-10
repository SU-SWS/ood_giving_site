import React from 'react'
import SbEditable from "storyblok-react"

const EmbedScript = (props) => {

  let prescript, postscript;

  if (props.blok && props.blok.pre_script) {
    prescript = (<div
      dangerouslySetInnerHTML={{
        __html: props.blok.pre_script,
      }}
    />)
  }

  return (
    <SbEditable content={props.blok}>
      {prescript}
      <div
        dangerouslySetInnerHTML={{
          __html: props.blok.script,
        }}
      />
      {postscript}
    </SbEditable>
  )
}

export default EmbedScript
