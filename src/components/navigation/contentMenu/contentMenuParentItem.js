import React from 'react'
import Link from 'gatsby-link'
import SbEditable from 'storyblok-react'
import CreateBloks from "../../../utilities/createBloks"

const ContentMenuParentItem = (props) => (
  <SbEditable content={props.blok}>
    <li className="su-secondary-nav__item su-secondary-nav__item--parent ood-content-nav__item ood-content-nav__item--parent">
      {props.blok.parentItemLink.linktype === "story" &&
      <Link to={`/${props.blok.parentItemLink.cached_url}/`} activeClassName="ood-content-nav__link--active" className="su-secondary-nav__link ood-content-nav__link">{props.blok.parentItemText}
      </Link>}
      {props.blok.parentItemLink.linktype === "url" &&
      <a href={props.blok.parentItemLink.url} className="su-secondary-nav__link su-link--external ood-content-nav__link">{props.blok.parentItemText}
      </a>}
      <CreateBloks blokSection={props.blok.nestedMenu} />
    </li>
  </SbEditable>
)

export default ContentMenuParentItem
