import React from 'react'
import SbEditable from 'storyblok-react'
import RichTextField from '../../utilities/richTextField'
import AspectRatioImage from "../media/aspectRatioImage"

const OodQuoteCard = (props) => (
  <SbEditable content={props.blok}>
    <article className={ `ood-quote-card su-bg-${props.blok.backgroundColor} ood-shadow-shallow
             ${(props.blok.image.filename && props.blok.showImage === "has-image") ? "ood-quote-card--has-image" : "ood-quote-card--no-image"}
             su-text-align-${props.blok.textAlign}`
    }>
      <div className="ood-quote-card__content">
        {props.blok.quoteText && (
          <blockquote className={`ood-quote-card__quote su-serif
                      su-before-color-${props.blok.quotationMarkColor}
                      ${props.blok.smallText === true ? "su-mod-type-1" : "su-mod-type-2"}
          `}>
            <RichTextField data={props.blok.quoteText} />
          </blockquote>
        )}
        {props.blok.quoteSource && (
          <div className={`ood-quote-card__source su-semibold
                ${props.blok.textAlign === "center" ? "su-mx-auto" : ""}
                ${props.blok.textAlign === "right" ? "su-mr-0 su-ml-auto" : ""}`}>
            <RichTextField data={props.blok.quoteSource} />
          </div>
        )}
      </div>
      {(props.blok.image.filename != null && props.blok.showImage === "has-image") && (
        <AspectRatioImage
          {...props}
          filename={props.blok.image.filename}
          alt={props.blok.image.alt}
          classPrefix={"ood-quote-card"}
          imageSize={"thumbnail"}
          aspectRatio={"1x1"}
          visibleHorizontal={props.blok.visibleHorizontal}
          visibleVertical={props.blok.visibleVertical}
        />
      )}
    </article>
  </SbEditable>
)

export default OodQuoteCard
