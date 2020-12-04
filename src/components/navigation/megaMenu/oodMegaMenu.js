import React, {useContext} from 'react'
import SbEditable from 'storyblok-react'
import CreateBloks from "../../../utilities/createBloks"
import {searchOverlayOpenContext} from '../../../context/searchOverlayStatusProvider'

const OodMegaMenu = (props) => {
  const {toggleSearchOverlay} = useContext(searchOverlayOpenContext)
  return (
    <SbEditable content={props.blok}>
      <nav className="ood-mega-nav no-js" aria-label="Main Menu">
        <button className="ood-mega-nav__toggle su-mr-none su-ml-auto" aria-label="menu toggle" aria-expanded="false"><i
          aria-hidden="true" className={`fas fa-bars`}/>Menu
        </button>
        <ul className="ood-mega-nav__menu-lv1 su-list-none">
          <CreateBloks blokSection={props.blok.topLevelLinks}/>
          <li onClick={toggleSearchOverlay}>Search</li>
        </ul>
      </nav>
    </SbEditable>
  )
}
export default OodMegaMenu
