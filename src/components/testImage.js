import React from 'react'
import SbEditable from 'storyblok-react'
import RichTextField from './richTextField'

const TestImage = (props) => (
  <SbEditable content={props.blok}>
    <figure className="su-media">
      <div className="su-media__wrapper su-aspect-ratio">
        <img src={props.blok.image.filename} alt={props.blok.image.alt}></img>
      </div>
      {props.blok.image.caption && (
        <figcaption className="su-media__caption">{ props.blok.image.caption }</figcaption>
      )}
    </figure>
  </SbEditable>
)

export default TestImage