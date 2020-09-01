import React from 'react'
import SbEditable from 'storyblok-react'

const OodHomepageHero = (props) => (
  <SbEditable content={props.blok}>
    <div className={`ood-hero-home su-bg-${props.blok.backgroundColor}`}>
      <figure className="su-media ood-hero-home__media">
        <div className="su-media__wrapper ood-hero-home__media-wrapper">
          <img className="ood-hero-home__image"
               src={props.blok.image.filename ? props.blok.image.filename : ""}
               alt={props.blok.image.alt ? props.blok.image.alt : ""}
          />
        </div>
      </figure>
      <div className="centered-container flex-container ood-hero-home__content">
        <h1 className={`flex-lg-8-of-12 ood-hero-home__splash-text su-mod-type-${props.blok.splashTextSize} su-text-white su-text-focus-in`}>{props.blok.splashText}</h1>
        <a className={`flex-lg-4-of-12 ood-hero-home__link su-text-white su-bg-${props.blok.ctaBackgroundColor}`} href={props.blok.link} rel="nofollow noopener">
          <h2 className={`ood-hero-home__cta-headline su-text-white`}>{props.blok.ctaHeadline}</h2>
          <p className={`su-link--action ood-hero-home__cta-text su-text-white su-text-align-right`}>{props.blok.ctaText}</p>
        </a>
      </div>
    </div>
  </SbEditable>
)

export default OodHomepageHero