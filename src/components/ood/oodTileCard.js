import React from 'react'
import { Link } from "gatsby"
import Components from '../components.js'
import SbEditable from 'storyblok-react'
import RichTextField from '../richTextField'

const OodTileCard = (props) => (
  <SbEditable content={props.blok}>
    <article className={`su-card su-card--link tile-card ${props.blok.showImage} ${props.blok.backgroundColor !== "white" ? "text-white" : ""}`}>
      <a href={props.blok.link} rel="nofollow noopener" className={`tile-card__link bg-${props.blok.backgroundColor}`}>
        {props.blok.image.filename && (
          <figure className="su-media tile-card__media">
            <div className="su-media__wrapper su-aspect-ratio su-aspect-ratio--3x2">
              <img className="tile-card__image" src={props.blok.image.filename} alt="" />
            </div>
          </figure>
        )}
        <section className="su-card__contents">
          {props.blok.icon.icon && (
            <i className={`${props.blok.icon.type} ${props.blok.icon.icon}`} />
          )}
          {props.blok.areaToSupport && (
            <span className="tile-card__superhead">{props.blok.areaToSupport}</span>
          )}
          <h2 className="tile-card__headline">{props.blok.headline}</h2>
        </section>
      </a>
    </article>
  </SbEditable>
)

export default OodTileCard