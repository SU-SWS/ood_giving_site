import React from 'react'
import Link from 'gatsby-link'
import SbEditable from 'storyblok-react'
import Components from "../components";

const ContentMenuParentItem = (props) => (
  <SbEditable content={props.blok}>
    <li className="su-secondary-nav__item ood-content-nav__item">
      <a href="" className="ood-content-nav__link">{props.blok.parentItemText}</a>
      {props.blok.nestedMenu && props.blok.nestedMenu.map((blok) => React.createElement(Components(blok.component), {
        key: blok._uid,
        blok: blok,
      }))}
    </li>
  </SbEditable>
)

export default ContentMenuParentItem