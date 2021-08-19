import React from "react";
import SbEditable from "storyblok-react";
import CreateBloks from "../../utilities/createBloks";
import CenteredContainer from "../partials/centeredContainer";
import HeaderSearchButton from "../search/headerSearchButton";

const OodLocalHeader = (props) => (
  <SbEditable content={props.blok}>
    <header
      className={`ood-header su-bg-white su-border-color-${props.blok.topBarColor}`}
    >
      <a href="#main-content" className="su-skiplinks">
        Skip to main content
      </a>
      <div className="ood-header__submenu-container">
        <CreateBloks blokSection={props.blok.subMenu} />
      </div>
      <CenteredContainer classes="ood-header__masthead">
        <CreateBloks blokSection={props.blok.lockup} />
        <div className="ood-header__megamenu-wrapper">
          <CreateBloks blokSection={props.blok.megaMenu} />
          <HeaderSearchButton />
        </div>
      </CenteredContainer>
    </header>
  </SbEditable>
);

export default OodLocalHeader;
