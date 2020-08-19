import React from 'react'
import { Link } from "gatsby"
import Components from '../components.js'
import SbEditable from 'storyblok-react'
import RichTextField from '../richTextField'

const OodTileCard = (props) => (
  <SbEditable content={props.blok}>
    <article className={ `su-card ood-card su-card--link ${props.blok.backgroundColor} ${props.blok.showImage}` }>
      <a href={props.blok.link} rel="nofollow noopener">
        {props.blok.image.filename && (
          <figure className="su-media">
            <div className="su-media__wrapper su-aspect-ratio su-aspect-ratio--3x2">
              <img src={props.blok.image.filename} alt="" />
            </div>
          </figure>
        )}
        <section className="su-card__contents">
          {props.blok.icon.icon && (
            <i className={props.blok.icon.type + " " + props.blok.icon.icon} />
          )}
          {props.blok.areaToSupport && (
            <span className="ood-card__superhead">{props.blok.areaToSupport}</span>
          )}
          <h2 className="ood-card__headline">{props.blok.headline}</h2>
        </section>
      </a>
    </article>
  </SbEditable>
)

export default OodTileCard