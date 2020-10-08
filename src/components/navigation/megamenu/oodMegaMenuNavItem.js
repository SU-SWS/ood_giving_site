import React from 'react'
import Link from 'gatsby-link'
import SbEditable from 'storyblok-react'

const OodMegaMenuNavItem = (props) => (
  <SbEditable content={props.blok}>
    <li className="ood-mega-nav__item">
      {props.blok.link.linktype === "story" &&
        <Link to={props.blok.link.cached_url === "home" ? "/" : `/${props.blok.link.cached_url}${props.blok.link.cached_url.endsWith("/") ? "" : "/"}`}
              className="ood-mega-nav__link" activeClassName="ood-mega-nav__link--active">
          {props.blok.linkText}
        </Link>
      }
      {props.blok.link.linktype === "url" &&
        <a href={props.blok.link.url}
           className={`ood-mega-nav__link su-link--external`}>
          {props.blok.linkText}
        </a>
      }
    </li>
  </SbEditable>
);

export default OodMegaMenuNavItem
