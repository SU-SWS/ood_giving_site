import React from 'react'
import SbEditable from 'storyblok-react'
import CreateBloks from "../../../utilities/createBloks"

const ContentNestedMenu = (props) => (
  <SbEditable content={props.blok}>
      <ul className={`su-secondary-nav__menu su-secondary-nav__menu-${props.blok.menuLevel} ood-content-nav__menu ood-content-nav__menu-${props.blok.menuLevel}`}>
        <CreateBloks blokSection={props.blok.menuItems} />
      </ul>
  </SbEditable>
)

export default ContentNestedMenu
