import React from "react"
import SbEditable from "storyblok-react"
import CreateBloks from "../../../utilities/createBloks"
import SbLink from "../../partials/sbLink"

const ContentMenuParentItem = props => {
  return (
    <SbEditable content={props.blok}>
      <li className="su-secondary-nav__item su-secondary-nav__item--parent ood-content-nav__item ood-content-nav__item--parent">
        <SbLink
          link={props.blok.parentItemLink}
          activeClass="ood-content-nav__link--active"
          classes="su-secondary-nav__link ood-content-nav__link"
          externalClasses="su-link--external"
        >
          {props.blok.parentItemText}
        </SbLink>
        <CreateBloks blokSection={props.blok.nestedMenu} />
      </li>
    </SbEditable>
  )
}

export default ContentMenuParentItem
