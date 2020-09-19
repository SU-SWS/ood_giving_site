import React from 'react'
import Link from 'gatsby-link'
import SbEditable from 'storyblok-react'

const NavItem = (props) => (
  <SbEditable content={props.blok}>
    <li>
      {props.blok.link.linktype === "story" &&
        <Link to={props.blok.link.cached_url === "home" ? "/" : `/${props.blok.link.cached_url}${props.blok.link.cached_url.endsWith("/") ? "" : "/"}`}
              activeClassName="active">
          {props.blok.linkTextLabel}
        </Link>
      }
      {props.blok.link.linktype === "url" &&
        <a href={props.blok.link.url} className="su-link--external">
          {props.blok.linkTextLabel}
        </a>
      }
    </li>
  </SbEditable>
)

export default NavItem
