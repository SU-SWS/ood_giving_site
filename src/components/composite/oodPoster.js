import React from 'react'
import Link from 'gatsby-link'
import SbEditable from 'storyblok-react'
import RichTextField from '../../utilities/richTextField'
import Components from "../components"
import transformImage from '../../utilities/transformImage'

const OodPoster = (props) => {
  let processedImg = "";
  if (props.blok.image.filename) {
    processedImg = transformImage(props.blok.image.filename, "/2000x0");
  }

  return (
    <SbEditable content={props.blok}>
      <div className={`ood-poster su-bg-${props.blok.backgroundColor}`
      }>
        {props.blok.image.filename && (
          <figure className={`su-hero__media ood-poster__media ${props.blok.overlay && (props.blok.overlay)}`}>
            <img src={processedImg} alt=""
                 className={`ood-poster__image su-obj-position-h-center-v-${props.blok.visibleVertical}`}
            />
          </figure>
        )}
        <div className="centered-container ood-poster__container">
          <div className={`flex-container ood-poster__row
             ${props.blok.cardPosition === "right" ? "su-flex-row-reverse" : ""}`
          }>
            <div className="flex-md-8-of-12 flex-xl-6-of-12 ood-poster__flex-cell">
              <div className={`ood-poster__card
                 ${`su-bg-${props.blok.cardBackgroundColor}`}
                 ${(props.blok.cardBackgroundColor !== "white" && props.blok.cardBackgroundColor !== "fog-light") ? "su-text-white" : ""}`
              }>
                {props.blok.headline && (
                  <h2 className="ood-poster__headline su-semibold">{props.blok.headline}</h2>
                )}
                {props.blok.bodyText &&
                  <div className="ood-poster__text">
                    <RichTextField data={props.blok.bodyText}/>
                  </div>
                }
                {props.blok.ctaLink && props.blok.ctaLink.map((blok) => React.createElement(Components(blok.component), {
                  key: blok._uid,
                  blok: blok
                }))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SbEditable>
  )
}

export default OodPoster