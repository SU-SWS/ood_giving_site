import React, { useRef, useState } from "react";
import SbEditable from "storyblok-react";
import CreateBloks from "../../../utilities/createBloks";
import UseEscape from "../../../hooks/useEscape";
import UseOnClickOutside from "../../../hooks/useOnClickOutside";
import UseWindowSize from "../../../hooks/useWindowSize";
import { config } from "../../../utilities/config";

const OodMegaMenu = (props) => {
  let windowSize = UseWindowSize();
  const [menuOpened, setMenuOpened] = useState(false);
  const ref = useRef(null);
  const burgerRef = useRef(null);
  const isExpanded = (x) => x.getAttribute("aria-expanded") === "true";

  const toggleMenu = () => {
    setMenuOpened(!menuOpened);
  };

  // Close menu if escape key is pressed and return focus to the menu button
  UseEscape(() => {
    if (burgerRef.current && isExpanded(burgerRef.current)) {
      setMenuOpened(false);
      burgerRef.current.focus();
    }
  });

  UseOnClickOutside(ref, () => setMenuOpened(false));

  if (windowSize.width >= config.breakpoint.lg) {
    return (
      <SbEditable content={props.blok}>
        <nav className="ood-mega-nav" aria-label="Main Menu">
          <ul className="ood-mega-nav__menu-lv1 su-list-none">
            <CreateBloks blokSection={props.blok.topLevelLinks} />
          </ul>
        </nav>
      </SbEditable>
    );
  }
  return (
    <SbEditable content={props.blok}>
      <nav className="ood-mega-nav" aria-label="Main Menu" ref={ref}>
        <button
          className="ood-mega-nav__toggle su-mr-none su-ml-auto"
          aria-label={menuOpened ? "Close Menu" : "Open Menu"}
          aria-expanded={menuOpened}
          onClick={toggleMenu}
          ref={burgerRef}
        >
          <i
            aria-hidden="true"
            className={`fas fa-${menuOpened ? "times" : "bars"}`}
          />
          {menuOpened ? "Close" : "Menu"}
        </button>
        <ul
          className="ood-mega-nav__menu-lv1 su-list-none"
          aria-hidden={!menuOpened}
        >
          <CreateBloks blokSection={props.blok.topLevelLinks} />
        </ul>
      </nav>
    </SbEditable>
  );
};

export default OodMegaMenu;
