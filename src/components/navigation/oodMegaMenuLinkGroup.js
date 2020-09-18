import React from 'react'
import SbEditable from 'storyblok-react'
import Components from "../components";

const OodMegaMenuLinkGroup = (props) => (
  <SbEditable content={props.blok}>
    <div className="ood-mega-menu__link-group">
      <h3 className={`ood-mega-menu__link-group-heading`}>{props.blok.heading}</h3>
      {props.blok.links && props.blok.links.map((blok) => React.createElement(Components(blok.component), {
        key: blok._uid,
        blok: blok,
      }))}
    </div>
  </SbEditable>
)

export default OodMegaMenuLinkGroup
