import React from 'react'
import SbEditable from 'storyblok-react'
import CreateBloks from "../../utilities/createBloks"

const OodLocalHeader = (props) => (
  <SbEditable content={props.blok}>
    <header className={props.blok.topBarColor ? `ood-header su-bg-white su-border-top-10px su-border-color-${props.blok.topBarColor}` : "ood-global-header su-bg-white su-border-top-5px"}>
      <a href="#main-content" className="su-skiplinks">Skip to main content</a>
      <div className="centered-container">
        <CreateBloks blokSection={props.blok.subMenu} />
        <CreateBloks blokSection={props.blok.lockup} />
        <CreateBloks blokSection={props.blok.megaMenu} />
      </div>
    </header>
  </SbEditable>
);

export default OodLocalHeader
