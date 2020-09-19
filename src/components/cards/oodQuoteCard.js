import React from 'react'
import SbEditable from 'storyblok-react'
import RichTextField from '../../utilities/richTextField'

const OodQuoteCard = (props) => (
  <SbEditable content={props.blok}>
    <article className={ `ood-quote-card su-bg-${props.blok.backgroundColor}
             ${(props.blok.photo.filename && props.blok.showImage === "has-image") ? "ood-quote-card--has-image" : "ood-quote-card--no-image"}
             su-text-align-${props.blok.textAlign}`
    }>
      <div className="ood-quote-card__content">
        <blockquote className={`ood-quote-card__quote su-before-color-${props.blok.quotationMarkColor}`}>{props.blok.quoteText}</blockquote>
        {props.blok.personName && (
          <p className="ood-quote-card__name">{props.blok.personName}</p>
        )}
        {(props.blok.personClassYear || props.blok.personTitle) && (
          <p className="ood-quote-card__bio">
            {`${props.blok.personTitle}${(props.blok.personTitle && props.blok.personClassYear) ? ", " : ""}${props.blok.personClassYear}`}</p>
        )}
      </div>
      {(props.blok.photo.filename && props.blok.showImage === "has-image") && (
        <figure className="su-media ood-quote-card__media">
          <div className="su-media__wrapper su-aspect-ratio--1x1">
            <img className={`ood-quote-card__img su-obj-position-${props.blok.visibleHorizontal}-${props.blok.visibleVertical}`}
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
