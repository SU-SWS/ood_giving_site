import React from 'react'
import Components from '../components.js'
import SbEditable from 'storyblok-react'

const OodQuoteSlider = (props) => (
  <SbEditable content={props.blok}>
    <div className="ood-quote-slider">
      <h2>{props.blok.title}</h2>
      {props.blok.quotes && props.blok.quotes.map((story) => React.createElement(Components(story.content.component), {
        key: story.content._uid,
        blok: story.content,
      }))}
    </div>
  </SbEditable>
)

export default OodQuoteSlider