import React from 'react'
import Link from 'gatsby-link'
import SbEditable from 'storyblok-react'

const ContentNavItem = (props) => (
  <SbEditable content={props.blok}>
    <li className="su-secondary-nav__item ood-content-nav__item">
      {props.blok.link.linktype === "story" &&
        <Link to={props.blok.link === 'home' ? "/" : `/${props.blok.link.cached_url}/`}
              activeClassName="ood-content-nav__link--active"
              className="su-secondary-nav__link ood-content-nav__link">
          {props.blok.linkText}
        </Link>
      }
      {props.blok.link.linktype === "url" &&
        <a href={props.blok.link.url} className="su-secondary-nav__link su-link--external ood-content-nav__link">{props.blok.linkText}</a>
      }
    </li>
  </SbEditable>
)

export default ContentNavItem