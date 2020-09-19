import React from 'react'
import SbEditable from 'storyblok-react'
import Components from "../components";

const OodMegaMenuSection = (props) => (
  <SbEditable content={props.blok}>
    <button className="ood-mega-menu__trigger">{props.blok.linkText}</button>
    <div className="ood-mega-menu__section">
      {props.blok.linkGroups && props.blok.linkGroups.map((blok) => React.createElement(Components(blok.component), {
        key: blok._uid,
        blok: blok,
      }))}
      {props.blok.card && props.blok.card.map((blok) => React.createElement(Components(blok.component), {
        key: blok._uid,
        blok: blok,
      }))}
    </div>
  </SbEditable>
)

export default OodMegaMenuSection
