import React from 'react'
import SbEditable from 'storyblok-react'
import Components from "../components"

const OodLocalHeader = (props) => (
  <SbEditable content={props.blok}>
    <header className={props.blok.topBarColor ? `ood-header su-bg-white su-border-top-10px su-border-color-${props.blok.topBarColor}` : "ood-global-header su-bg-white su-border-top-5px"}>
      <a href="#main-content" className="su-skiplinks ">Skip to main content</a>
      <div className="centered-container">
        {props.blok.subMenu && props.blok.subMenu.map((blok) => React.createElement(Components(blok.component), {
          key: blok._uid,
          blok: blok
        }))}
        {props.blok.lockup && props.blok.lockup.map((blok) => React.createElement(Components(blok.component), {
          key: blok._uid,
          blok: blok
        }))}
        {props.blok.megaMenu && props.blok.megaMenu.map((blok) => React.createElement(Components(blok.component), {
          key: blok._uid,
          blok: blok
        }))}
      </div>
    </header>
  </SbEditable>
);

export default OodLocalHeader