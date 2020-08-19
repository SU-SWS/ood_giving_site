import React from 'react'
import SbEditable from 'storyblok-react'
import RichTextField from './richTextField'

const FeaturedImage = (props) => (
  <SbEditable content={props.blok}>
    <figure className="su-media">
      <div className="su-media__wrapper su-aspect-ratio">
        <img src={props.blok.image ? props.blok.image : ""} alt={ props.blok.altText ? props.blok.altText : "" }></img>
      </div>
      {props.blok.caption && (
        <figcaption className="su-media__caption"><RichTextField data={ props.blok.caption }></RichTextField></figcaption>
      )}
    </figure>
  </SbEditable>
)

export default FeaturedImage