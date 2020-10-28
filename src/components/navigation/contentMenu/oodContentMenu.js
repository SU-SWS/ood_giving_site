import React from 'react'
import SbEditable from 'storyblok-react'
import CreateBloks from "../../../utilities/createBloks"

const OodContentMenu = (props) => {
  return (
    <SbEditable content={props.blok}>
      <nav className="su-secondary-nav ood-content-nav no-js" id="content-nav" aria-label="Content Menu">
        <div className={`ood-content-nav__menu-group`}>
          {props.blok.menuTitle && (
            <h2 className="ood-content-nav__title">{props.blok.menuTitle}</h2>
          )}
          <ul
            className="su-secondary-nav__menu su-secondary-nav__menu-lv1 ood-content-nav__menu ood-content-nav__menu-lv1">
            <CreateBloks blokSection={props.blok.menuLinks} />
          </ul>
        </div>
        {props.blok.relatedMenuLinks && (
          <div className={`ood-content-nav__menu-group`}>
            {props.blok.relatedMenuTitle && (
              <h2 className="ood-content-nav__title">{props.blok.relatedMenuTitle}</h2>
            )}
            <ul
              className="su-secondary-nav__menu su-secondary-nav__menu-lv1 ood-content-nav__menu ood-content-nav__menu-lv1 ood-content-nav__menu-related">
              <CreateBloks blokSection={props.blok.relatedMenuLinks} />
            </ul>
          </div>
        )}
      </nav>
    </SbEditable>
  )
}
export default OodContentMenu
