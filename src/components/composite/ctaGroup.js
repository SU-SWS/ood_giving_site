import React from 'react'
import Components from '../components.js'
import SbEditable from 'storyblok-react'
import CreateBloks from "../../utilities/createBloks";

const ctaGroup = (props) => (
  <SbEditable content={props.blok}>
    <div className="cta-group">
      <CreateBloks blokSection={props.blok.ctaLinks} display={props.blok.display} />
    </div>
  </SbEditable>
)

export default ctaGroup
