import React from 'react'
import Link from 'gatsby-link'
import SbEditable from 'storyblok-react'
import Components from "../components";

const ContentNestedMenu = (props) => (
  <SbEditable content={props.blok}>
      <ul className="su-secondary-nav__menu ood-content-nav__menu ood-content-nav__menu-lv2">
        {props.blok.menuItems && props.blok.menuItems.map((blok) => React.createElement(Components(blok.component), {
          key: blok._uid,
          blok: blok,
        }))}
      </ul>
  </SbEditable>
)

export default ContentNestedMenu