import React from 'react'
import SbEditable from 'storyblok-react'
import CreateBloks from "../../../utilities/createBloks"

const OodMegaMenu = (props) => (
  <SbEditable content={props.blok}>
    <nav className="ood-mega-nav no-js" aria-label="Main Menu">
      <button className="ood-mega-nav__toggle su-mr-none su-ml-auto" aria-label="menu toggle" aria-expanded="false"><i aria-hidden="true" className={`fas fa-bars`} />Menu</button>
      <ul className="ood-mega-nav__menu-lv1 su-list-none">
        <CreateBloks blokSection={props.blok.topLevelLinks} />
      </ul>
    </nav>
  </SbEditable>
)

export default OodMegaMenu
