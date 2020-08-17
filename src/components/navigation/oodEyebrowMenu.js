import React from 'react'
import { Link } from "gatsby"
import Components from '../components.js'
import SbEditable from 'storyblok-react'

const OodEyebrowMenu = (props) => (
  <SbEditable content={props.blok}>
    <ul className="ood-eyebrow-menu">
      {props.blok.menuLinkItems && props.blok.menuLinkItems.map((blok) => React.createElement(Components(blok.component), {
        key: blok._uid,
        blok: blok
      }))}
    </ul>
    {props.blok.buttonLink.linktype === "story" &&
    <Link to={`/${props.blok.buttonLink.cached_url}/`} className="su-link su-button" activeClassName="active">{props.blok.buttonText}
    </Link>}
    {props.blok.buttonLink.linktype === "url" &&
    <a href={props.blok.buttonLink.url} className="su-link su-button">{props.blok.buttonText}
    </a>}
  </SbEditable>
)

export default OodEyebrowMenu
