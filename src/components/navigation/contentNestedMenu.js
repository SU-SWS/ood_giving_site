import React from 'react'
import SbEditable from 'storyblok-react'
import Components from "../components";

const ContentNestedMenu = (props) => (
  <SbEditable content={props.blok}>
      <ul className={`su-secondary-nav__menu su-secondary-nav__menu-${props.blok.menuLevel} ood-content-nav__menu ood-content-nav__menu-${props.blok.menuLevel}`}>
        {props.blok.menuItems && props.blok.menuItems.map((blok) => React.createElement(Components(blok.component), {
          key: blok._uid,
          blok: blok,
        }))}
      </ul>
  </SbEditable>
)

export default ContentNestedMenu