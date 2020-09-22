import React from 'react'
import SbEditable from 'storyblok-react'
import Components from '../components.js'
import RichTextField from '../../utilities/richTextField'

const BasicCard = (props) => (
  <SbEditable content={props.blok}>
    <article className={`su-card ood-basic-card su-bg-${props.blok.backgroundColor} ${props.blok.orientation? "su-card--horizontal" : ""}
             ${(props.blok.image.filename && props.blok.showImage === true) ? "ood-basic-card--has-image" : "ood-basic-card--no-image"}
             ${(props.blok.backgroundColor !== "white" && props.blok.backgroundColor !== "fog-light") ? "su-text-white" : ""}`
    }>
      {(props.blok.image.filename && props.blok.showImage === true) && (
        <figure className="su-media ood-basic-card__media">
          <div className="su-media__wrapper su-aspect-ratio su-aspect-ratio--3x2">
            <img className="ood-basic-card__image" src={props.blok.image.filename} alt="" />
          </div>
        </figure>
      )}
      <section className="su-card__contents ood-basic-card__contents">
        {props.blok.superheadline && (
          <span className="ood-basic-card__superhead su-uppercase su-semibold">{props.blok.superheadline}</span>
        )}
        <h2 className="ood-basic-card__headline su-serif">{props.blok.headline}</h2>
        {props.blok.content &&
          <div className="ood-basic-card__body">
            <RichTextField data={props.blok.content}/>
          </div>
        }
        {props.blok.ctaLink && props.blok.ctaLink.map((blok) => React.createElement(Components(blok.component), {
          key: blok._uid,
          blok: blok
        }))}
      </section>
    </article>
  </SbEditable>
)

export default BasicCard