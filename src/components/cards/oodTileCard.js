import React from 'react'
import { Link } from "gatsby"
import SbEditable from 'storyblok-react'

const OodTileCard = (props) => {
  const TileCardContent = (props) => (
    <SbEditable content={props.blok}>
      {(props.blok.image.filename && props.blok.showImage === true) && (
        <figure className="su-media ood-tile-card__media">
          <div className="su-media__wrapper su-aspect-ratio su-aspect-ratio--3x2">
            <img className="ood-tile-card__image" src={props.blok.image.filename} alt="" />
          </div>
        </figure>
      )}
      <section className="su-card__contents ood-tile-card__contents">
        {props.blok.superheadline && (
          <span className="ood-tile-card__superhead su-uppercase su-semibold">{props.blok.superheadline}</span>
        )}
        <h2 className="ood-tile-card__headline su-semibold">{props.blok.headline}</h2>
      </section>
    </SbEditable>
  );

  return (
    <SbEditable content={props.blok}>
      <article className={`su-card su-card--link ood-tile-card
             ${(props.blok.image.filename && props.blok.showImage === true) ? "ood-tile-card--has-image" : "ood-tile-card--no-image"}
             ${(props.blok.backgroundColor !== "white" && props.blok.backgroundColor !== "fog-light") ? "su-text-white" : ""}`
      }>
        {props.blok.link.linktype === "story" &&
          <Link
            to={props.blok.link.cached_url === "home" ? "/" : `/${props.blok.link.cached_url}${props.blok.link.cached_url.endsWith("/") ? "" : "/"}`}
            className={`ood-tile-card__link su-bg-${props.blok.backgroundColor}`}
          >
            <TileCardContent {...props}/>
          </Link>
        }
        {props.blok.link.linktype === "url" &&
          <a href={props.blok.link.url} className={`ood-tile-card__link su-bg-${props.blok.backgroundColor}`}>
            <TileCardContent {...props}/>
          </a>
        }
      </article>
    </SbEditable>
  )
};

export default OodTileCard