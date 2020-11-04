import React from 'react'
import SbEditable from 'storyblok-react'
import RichTextField from '../../utilities/richTextField'
import transformImage from '../../utilities/transformImage'
import CreateBloks from "../../utilities/createBloks"

const OodPoster = (props) => {
  const Heading = props.blok.headingLevel ? props.blok.headingLevel : "h3";
  let processedImg;
  processedImg = transformImage(props.blok.image.filename, "/2000x0");

  return (
    <SbEditable content={props.blok}>
      <div className={`ood-poster su-bg-${props.blok.backgroundColor}`
      }>
        {props.blok.image.filename != null && (
          <figure className={`su-hero__media ood-poster__media ${props.blok.overlay && (props.blok.overlay)}`}>
            <img src={processedImg}
                 alt={props.blok.image.alt ? props.blok.image.alt : ""}
                 className={`ood-poster__image su-obj-position-h-center-v-${props.blok.visibleVertical}`}
            />
          </figure>
        )}
        <div className="centered-container ood-poster__container">
          <div className={`flex-container ood-poster__row
             ${props.blok.cardPosition === "right" ? "su-flex-row-reverse" : ""}`
          }>
            <div className="flex-sm-9-of-12 flex-md-8-of-12 flex-lg-7-of-12 flex-xl-6-of-12 ood-poster__flex-cell">
              <div className={`ood-poster__card
                   su-bg-${props.blok.cardBackgroundColor} ood-shadow-shallow-dark
                   ${(props.blok.cardBackgroundColor !== "white" && props.blok.cardBackgroundColor !== "fog-light") ? "su-text-white" : ""}`
              }>
                {props.blok.headline && (
                  <Heading className="ood-poster__headline su-semibold">{props.blok.headline}</Heading>
                )}
                {props.blok.bodyText &&
                  <div className="ood-poster__text">
                    <RichTextField data={props.blok.bodyText}/>
                  </div>
                }
                <CreateBloks blokSection={props.blok.ctaLink} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </SbEditable>
  )
}

export default OodPoster
