import React from 'react'
import SbEditable from 'storyblok-react'

const FeaturedImage = (props) => (
  <SbEditable content={props.blok}>
    <figure className="su-media">
      <div className="su-media__wrapper su-aspect-ratio">
        <img src={props.blok.image ? "https:" + props.blok.image : ""} alt={ props.blok.altText ? props.blok.altText : "" }></img>
      </div>
      <figcaption>{props.blok.caption}</figcaption>
    </figure>
  </SbEditable>
)

export default FeaturedImage