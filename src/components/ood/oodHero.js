import React from 'react'
import Components from '../components.js'
import SbEditable from 'storyblok-react'

const OodHero = (props) => (
  <SbEditable content={props.blok}>
    <div className={ `ood-hero su-${props.blok.backgroundColor}` }>
      {props.blok.image && props.blok.image.map((blok) => React.createElement(Components(blok.component), {
        key: blok._uid,
        blok: blok
      }))}
      <div className="centered-container">
        <h1 className="ood-hero__splash-text su-text-white su-text-focus-in">{props.blok.splashText}</h1>
        <a className="ood-hero__link su-text-white" href={props.blok.link} rel="nofollow noopener">
          <p className={ `ood-hero__cta-text su-text-white su-${props.blok.colorTheme}` }>{props.blok.callToActionText}</p>
        </a>
      </div>
    </div>
  </SbEditable>
)

export default OodHero