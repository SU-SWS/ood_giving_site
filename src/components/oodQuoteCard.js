import React from 'react'
import SbEditable from 'storyblok-react'
import RichTextField from './richTextField'

const OodQuoteCard = (props) => (
  <SbEditable content={props.blok}>
    <article className={ `ood-quote-card ${props.blok.backgroundColor} ${props.blok.showImage}` }>
      <div className="ood-quote-card__content">
        <blockquote className={`ood-quote-card__quote ${props.blok.quotationMarkColor}`}>{props.blok.quoteText}</blockquote>
        <p className="ood-quote-card__name">{props.blok.personName}</p>
        <p className="ood-quote-card__bio">{`${props.blok.personTitle}, ${props.blok.personClassYear}`}</p>
      </div>
      {props.blok.photo.filename && (
        <figure className="su-media ood-quote-card__figure">
          <div className="su-media__wrapper su-aspect-ratio--1x1">
            <img className={`ood-quote-card__img + obj-position-${props.blok.visibleHorizontal}-${props.blok.visibleVertical}`}
                 src={props.blok.photo.filename}
                 alt={props.blok.photo.alt}
            />
          </div>
        </figure>
      )}
    </article>
  </SbEditable>
)

export default OodQuoteCard
