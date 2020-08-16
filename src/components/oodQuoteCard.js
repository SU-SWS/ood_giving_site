import React from 'react'
import Components from './components.js'
import SbEditable from 'storyblok-react'
import RichTextField from './richTextField'

const OodQuoteCard = (props) => (
  <SbEditable content={props.blok}>
    <article className={ "ood-quote-card " + props.blok.backgroundColor + " " + props.blok.showImage }>
      <blockquote>{props.blok.quoteText}</blockquote>
      <p>{props.blok.personName}</p>
      <p>{props.blok.persontitle} {props.blok.personClassYear}</p>
      {props.blok.photo.filename && (
        <figure className="su-media">
          <div className="su-media__wrapper su-aspect-ratio--1x1">
            <img src={props.blok.photo.filename} alt={props.blok.photo.alt}></img>
          </div>
        </figure>
      )}
    </article>
  </SbEditable>
)

export default OodQuoteCard