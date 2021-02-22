import React from 'react'
import SbEditable from 'storyblok-react'
import CreateBloks from "../../utilities/createBloks";

const ctaGroup = (props) => {
  const display = props.blok.display === "inline-block" ? "su-flex-row su-flex-wrap su-justify-content-center" : "su-flex-col";

  return (
    <SbEditable content={props.blok}>
      <div className={`cta-group su-flex ${display}`}>
        <CreateBloks blokSection={props.blok.ctaLinks} />
      </div>
    </SbEditable>
  )
}

export default ctaGroup
