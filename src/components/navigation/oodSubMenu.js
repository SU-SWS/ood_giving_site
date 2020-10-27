import React from 'react'
import { Link } from "gatsby"
import SbEditable from 'storyblok-react'
import CreateBloks from "../../utilities/createBloks"

const OodSubMenu = (props) => (
  <SbEditable content={props.blok}>
    <nav className="ood-submenu" aria-label="Sub Menu">
      <ul>
        <CreateBloks blokSection={props.blok.menuLinkItems} />
      </ul>
      {props.blok.buttonLink.linktype === "story" &&
        <Link to={props.blok.link.cached_url === "home" ? "/" : `/${props.blok.link.cached_url}${props.blok.link.cached_url.endsWith("/") ? "" : "/"}`}
              className="su-button" activeClassName="active">{props.blok.buttonText}
        </Link>
      }
      {props.blok.buttonLink.linktype === "url" &&
        <a href={props.blok.buttonLink.url} className="su-button">{props.blok.buttonText}
        </a>
      }
    </nav>
  </SbEditable>
)

export default OodSubMenu
