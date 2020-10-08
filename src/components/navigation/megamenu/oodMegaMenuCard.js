import React from 'react'
import Link from 'gatsby-link'
import SbEditable from 'storyblok-react'

const OodMegaMenuCard = (props) => (
  <SbEditable content={props.blok}>
    <div className="ood-mega-nav__card flex-lg-3-of-12">
      {props.blok.image.filename && (
        <figure className="su-media ood-mega-nav__card-media">
          <div className="su-media__wrapper su-aspect-ratio su-aspect-ratio--3x2">
            <img className="ood-mega-nav__card-image" src={props.blok.image.filename} alt="" />
          </div>
        </figure>
      )}
      <div
        className={props.blok.backgroundColor ? "ood-mega-nav__card-content su-text-white su-bg-" + props.blok.backgroundColor : "ood-mega-nav--card--text-area su-bg-bright-red"}>
        <h3 className="ood-mega-nav__card-heading su-semibold">{props.blok.heading}</h3>
        <div className="ood-mega-nav--card-cta">{props.blok.ctaText}</div>
      </div>
    </div>
  </SbEditable>
)

export default OodMegaMenuCard
