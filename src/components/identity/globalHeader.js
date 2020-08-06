import React from 'react'
import SbEditable from 'storyblok-react'
import Components from "../components"

const GlobalHeader = (props) => (
  <SbEditable content={props.blok}>
    <div className={props.blok.topBarColor ? "ood-global-header border-top-5px border-color-" + props.blok.topBarColor : "ood-global-header border-top-5px"}>
      <a href="#main-content" className="su-skiplinks ">Skip to main content</a>
      <div>
        {props.blok.lockup && props.blok.lockup.map((blok) => React.createElement(Components(blok.component), {
          key: blok._uid,
          blok: blok
        }))}
      </div>
    </div>
  </SbEditable>
)

export default GlobalHeader