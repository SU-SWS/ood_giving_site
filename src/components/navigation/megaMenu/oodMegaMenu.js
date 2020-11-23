import React, { useRef, useState } from "react"
import SbEditable from 'storyblok-react'
import CreateBloks from "../../../utilities/createBloks"
import UseEscape from "../../../hooks/useEscape"
import UseOnClickOutside from "../../../hooks/useOnClickOutside"
import UseWindowSize from "../../../hooks/useWindowSize"

const OodMegaMenu = (props) => {
  let windowSize = UseWindowSize();
  const [menuOpened, setMenuOpened] = useState(false);
  const ref = useRef();

  const toggleMenu = () => {
    setMenuOpened(!menuOpened);
  }

  UseEscape(() => setMenuOpened(false));
  UseOnClickOutside(ref, () => setMenuOpened(false));

  if (windowSize.width > 991) {
    return (
      <SbEditable content={props.blok}>
        <nav className="ood-mega-nav" aria-label="Main Menu">
          <ul className="ood-mega-nav__menu-lv1 su-list-none">
            <CreateBloks blokSection={props.blok.topLevelLinks}/>
          </ul>
        </nav>
      </SbEditable>
    )
  }
  else {
    return (
      <SbEditable content={props.blok}>
        <nav className="ood-mega-nav" aria-label="Main Menu">
          <button className="ood-mega-nav__toggle su-mr-none su-ml-auto" aria-label="menu toggle" aria-expanded="false">
            <i aria-hidden="true" className={`fas fa-bars`}/>Menu
          </button>
          <ul className="ood-mega-nav__menu-lv1 su-list-none">
            <CreateBloks blokSection={props.blok.topLevelLinks}/>
          </ul>
        </nav>
      </SbEditable>
    )
  }
}

export default OodMegaMenu
