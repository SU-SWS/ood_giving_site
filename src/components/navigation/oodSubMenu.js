import React from 'react'
import SbEditable from 'storyblok-react'
import CreateBloks from "../../utilities/createBloks"

const OodSubMenu = (props) => (
  <SbEditable content={props.blok}>
    <nav className="ood-submenu" aria-label="Sub Menu">
      <ul>
        <CreateBloks blokSection={props.blok.menuLinkItems} />
      </ul>
      <CreateBloks blokSection={props.blok.ctaLink} />
    </nav>
  </SbEditable>
)

export default OodSubMenu
