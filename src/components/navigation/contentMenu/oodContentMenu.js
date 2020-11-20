import React from 'react'
import SbEditable from 'storyblok-react'
import CreateBloks from "../../../utilities/createBloks"
import Heading from "../../partials/heading"
import UseWindowSize from "../../../hooks/useWindowSize"

const OodContentMenu = (props) => {
  let windowSize = UseWindowSize();

  const Menus = (props) => (
    <>
      <div className={`ood-content-nav__menu-group`}>
        {props.blok.menuTitle && (
          <Heading level={'h2'} classes={`ood-content-nav__title`}>{props.blok.menuTitle}</Heading>
        )}
        <ul className="su-secondary-nav__menu su-secondary-nav__menu-lv1 ood-content-nav__menu ood-content-nav__menu-lv1">
          <CreateBloks blokSection={props.blok.menuLinks} />
        </ul>
      </div>
      {props.blok.relatedMenuLinks && (
        <div className={`ood-content-nav__menu-group`}>
          {props.blok.relatedMenuTitle && (
            <Heading level={'h2'} classes={`ood-content-nav__title`}>{props.blok.relatedMenuTitle}</Heading>
          )}
          <ul className="su-secondary-nav__menu su-secondary-nav__menu-lv1 ood-content-nav__menu ood-content-nav__menu-lv1 ood-content-nav__menu-related">
            <CreateBloks blokSection={props.blok.relatedMenuLinks} />
          </ul>
        </div>
      )}
    </>
  );

  // Desktop version of the content menu is always expanded
  if (windowSize.width > 991) {
    return (
      <SbEditable content={props.blok}>
        <nav className="su-secondary-nav ood-content-nav" id="content-nav" aria-label="Section Content Menu">
          <div className={`ood-content-nav__menus`}>
            <Menus {...props} />
          </div>
        </nav>
      </SbEditable>
    )
  } else
    // Mobile/tablet version of the content menu with toggle button and collapsable
    return (
      <SbEditable content={props.blok}>
        <nav className="su-secondary-nav ood-content-nav" id="content-nav" aria-label="Section Content Menu">
          <button className={`ood-content-nav__toggle`}>Section Menu <i aria-hidden="true" className={`fas fa-bars`} /></button>
          <div className={`ood-content-nav__menus`}>
            <Menus {...props} />
          </div>
        </nav>
      </SbEditable>
    )
}
export default OodContentMenu
