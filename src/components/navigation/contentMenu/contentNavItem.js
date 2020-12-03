import React from "react"
import SbEditable from "storyblok-react"
import SbLink from "../../partials/sbLink"

const ContentNavItem = props => {
  return (
    <SbEditable content={props.blok}>
      <li className="su-secondary-nav__item ood-content-nav__item">
        <SbLink
          link={props.blok.link}
          activeClass="ood-content-nav__link--active"
          classes="su-secondary-nav__link ood-content-nav__link"
          externalClasses="su-link--external"
        >
          {props.blok.linkText}
        </SbLink>
      </li>
    </SbEditable>
  )
}

export default ContentNavItem
