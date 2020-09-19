import React from 'react'
import SbEditable from 'storyblok-react'
import Components from "../components";

const OodMegaMenuLinkGroup = (props) => (
  <SbEditable content={props.blok}>
    <div className="ood-mega-nav__link-group">
      <h3 className={`ood-mega-nav__link-group-heading su-uppercase su-bold`}>{props.blok.heading}</h3>
      <ul className="ood-mega-nav__menu-lv2 su-list-none">
        {props.blok.links && props.blok.links.map((blok) => React.createElement(Components(blok.component), {
          key: blok._uid,
          blok: blok,
        }))}
      </ul>
    </div>
  </SbEditable>
)

export default OodMegaMenuLinkGroup
