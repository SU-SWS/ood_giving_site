import React from 'react'
import Components from '../components.js'
import SbEditable from 'storyblok-react'

const OodQuoteSlider = (props) => (
  <SbEditable content={props.blok}>
    <div className="ood-quote-slider">
      <h2>{props.blok.title}</h2>
      {props.blok.quotes && props.blok.quotes.map((blok) => React.createElement(Components(blok.component), {
        key: blok._uid,
        blok: blok,
      }))}
    </div>
  </SbEditable>
)

export default OodQuoteSlider