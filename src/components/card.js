import React from 'react'
import Components from './components.js'
import SbEditable from 'storyblok-react'
import RichTextField from './richTextField'

const Card = (props) => (
  <SbEditable content={props.blok}>
    <article className={ "su-card ood-card su-card--link " + props.blok.colorTheme + " " + props.blok.showImage }>
      <a href={props.blok.link} rel="nofollow noopener">
        {props.blok.image && props.blok.image.map((blok) => React.createElement(Components(blok.component), {
          key: blok._uid,
          blok: blok
        }))}
        <section className="su-card__contents">
          <i className={props.blok.icon.type + " " + props.blok.icon.icon}></i>
          <span>{props.blok.superheadline}</span>
          <h2>{props.blok.headline}</h2>
          <RichTextField data={ props.blok.bodyText ? props.blok.bodyText : "" }></RichTextField>
        </section>
      </a>
    </article>
  </SbEditable>
)

export default Card