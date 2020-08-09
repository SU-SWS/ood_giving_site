import React from 'react'
import Components from './components.js'
import SbEditable from 'storyblok-react'

const Hero = (props) => (
  <SbEditable content={props.blok}>
    <div className={ "ood-hero " + props.blok.colorTheme }>
      {props.blok.image && props.blok.image.map((blok) => React.createElement(Components(blok.component), {
        key: blok._uid,
        blok: blok
      }))}
        <h1 className="text-white">{props.blok.splashText}</h1>
        <a className="ood-hero__link" href={props.blok.link} rel="nofollow noopener">
          <p className={ "ood-hero__text " + props.blok.colorTheme }>{props.blok.callToActionText}</p>
        </a>
    </div>
  </SbEditable>
)

export default Hero