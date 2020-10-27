import React from 'react'
import SbEditable from 'storyblok-react'
import CreateBloks from "../../../utilities/createBloks"

const OodMegaMenuLinkGroup = (props) => (
  <SbEditable content={props.blok}>
    <div className="ood-mega-nav__link-group flex-lg-4-of-12">
      {props.blok.heading && (
        <h3 className={`ood-mega-nav__link-group-heading su-uppercase su-bold`}>{props.blok.heading}</h3>
      )}
      <ul className="ood-mega-nav__menu-lv2 su-list-none">
        <CreateBloks blokSection={props.blok.links} />
      </ul>
    </div>
  </SbEditable>
)

export default OodMegaMenuLinkGroup
