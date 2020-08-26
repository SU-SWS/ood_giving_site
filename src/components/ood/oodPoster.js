import React from 'react'
import Link from 'gatsby-link'
import SbEditable from 'storyblok-react'
import RichTextField from '../richTextField'
import Components from "../components";

const OodPoster = (props) => (
  <SbEditable content={props.blok}>
    <div className={`ood-poster su-bg-${props.blok.backgroundColor}`
    }>

      {props.blok.image.filename && (
        <figure className={`su-hero__media ood-poster__media ${props.blok.imageOverlay && (props.blok.imageOverlay)}`}>
          <img src={props.blok.image.filename} alt=""
               className={`ood-poster__image su-obj-position-h-center-v-${props.blok.visibleVertical}`}
          />
        </figure>
      )}

      <div className="centered-container ood-poster__container">
        <div className={`flex-container ood-poster__row
             ${props.blok.cardPosition === "right" ? "su-flex-row-reverse" : ""}`
        }>
          <div className="flex-md-6-of-12 ood-poster__flex-cell">
            <div className={`ood-poster__card1
                 ${`su-bg-${props.blok.cardBackgroundColor}`}
                 ${(props.blok.cardBackgroundColor !== "white" && props.blok.cardBackgroundColor !== "fog-light") ? "su-text-white" : ""}`
            }>
              {props.blok.headline1 && (
                <h2 className="ood-poster__headline">{props.blok.headline1}</h2>
              )}
              {props.blok.bodyText1 &&
              <div className="ood-poster__text">
                <RichTextField data={props.blok.bodyText1}/>
              </div>
              }
              {props.blok.ctaLink1.linktype === "story" &&
              <Link to={`/${props.blok.ctaLink1.cached_url}/`}>{props.blok.ctaText1}
              </Link>}
              {props.blok.ctaLink1.linktype === "url" &&
              <a href={props.blok.ctaLink1.url} className="su-link--external">{props.blok.ctaText1}
              </a>}
            </div>
          </div>
          <div className="flex-md-6-of-12">
            <div className="ood-poster__card2">
            </div>
          </div>
        </div>
      </div>


    </div>
  </SbEditable>
)

export default OodPoster
