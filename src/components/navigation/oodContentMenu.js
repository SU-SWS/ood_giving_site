import React from 'react'
import SbEditable from 'storyblok-react'
import Components from "../components";

const OodContentMenu = (props) => (
  <SbEditable content={props.blok}>
    {props.blok.menuTitle && (
      <h2>{props.blok.menuTitle}</h2>
    )}
    <nav className="su-secondary-nav ood-content-nav" id="content-nav" aria-label="Content Menu">
      <ul className="su-secondary-nav__menu su-secondary-nav__menu-lv1 ood-content-nav__menu ood-content-nav__menu-lv1">
        {props.blok.menuLinks && props.blok.menuLinks.map((blok) => React.createElement(Components(blok.component), {
          key: blok._uid,
          blok: blok,
        }))}
      </ul>
    </nav>
  </SbEditable>
)

export default OodContentMenu