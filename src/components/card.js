import React from 'react'
import Components from './components.js'
import SbEditable from 'storyblok-react'
import RichTextField from './richTextField'

const Card = (props) => (
  <SbEditable content={props.blok}>
    <article className={ "su-card ood-card su-card--link " + props.blok.colorTheme + " " + props.blok.showImage }>
      <a href={props.blok.link} rel="nofollow noopener">
        {props.blok.image.filename && (
          <figure className="su-media">
            <div className="su-media__wrapper su-aspect-ratio su-aspect-ratio--3x2">
              <img src={props.blok.image.filename} alt=""></img>
            </div>
          </figure>
        )}
        <section className="su-card__contents">
          {props.blok.icon.icon && (
            <i className={props.blok.icon.type + " " + props.blok.icon.icon}></i>
          )}
          {props.blok.superheadline && (
            <span className="ood-card__superhead">{props.blok.superheadline}</span>
          )}
          <h2 className="ood-card__headline">{props.blok.headline}</h2>
          {props.blok.bodyText && (
            <RichTextField data={ props.blok.bodyText }></RichTextField>
          )}
        </section>
      </a>
    </article>
  </SbEditable>
)

export default Card