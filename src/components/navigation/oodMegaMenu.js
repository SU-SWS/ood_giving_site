import React from 'react'
import Link from 'gatsby-link'
import SbEditable from 'storyblok-react'
import Components from "../components";

const OodMegaMenu = (props) => (
  <SbEditable content={props.blok}>
    <nav className="ood-mega-nav" aria-label="Main Menu">
      <button className="ood-mega-nav__toggle su-mr-none su-ml-auto" aria-expanded="false">Menu</button>
      <ul className="ood-mega-nav__menu-lv1 su-list-none">
        {props.blok.topLevelLinks && props.blok.topLevelLinks.map((blok) => React.createElement(Components(blok.component), {
          key: blok._uid,
          blok: blok,
        }))}
      </ul>
    </nav>
  </SbEditable>
)

export default OodMegaMenu
