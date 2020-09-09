import React from 'react'

const EmbedScript = (props) => (
    <div
      dangerouslySetInnerHTML={{
        __html: props.blok.script,
      }}
    />
)

export default EmbedScript