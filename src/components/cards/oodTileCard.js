import React from 'react'
import { Link } from "gatsby"
import SbEditable from 'storyblok-react'
import AspectRatioImage from "../media/aspectRatioImage"
import SbLink from "../partials/sbLink"

const OodTileCard = (props) => {
  const Heading = props.blok.headingLevel ? props.blok.headingLevel : "h3";

  const TileCardContent = (props) => (
    <SbEditable content={props.blok}>
      {(props.blok.image.filename != null && props.blok.showImage === true) && (
        <AspectRatioImage
          {...props}
          filename={props.blok.image.filename}
          alt={props.blok.image.alt}
          classPrefix={"ood-tile-card"}
          imageSize={"card"}
          aspectRatio={"3x2"}
        />
      )}
      <section className="ood-tile-card__contents">
        {props.blok.superheadline && (
          <span className="ood-tile-card__superhead su-uppercase">{props.blok.superheadline}</span>
        )}
        {props.blok.headline && (
          <Heading className={`ood-tile-card__headline su-semibold
                   ${props.blok.link.linktype === "url" ? "su-link--external" : ""}`}>{props.blok.headline}</Heading>
        )}
      </section>
    </SbEditable>
  );

  return (
    <SbEditable content={props.blok}>
      <article className={`ood-tile-card
        ${(props.blok.image.filename != null && props.blok.showImage === true) ? "ood-tile-card--has-image" : "ood-tile-card--no-image"}
        ${props.blok.backgroundColor !== "white" ? "su-text-white" : ""}`
      }>
        <SbLink link={props.blok.link}
                classes={`ood-tile-card__link su-bg-${props.blok.backgroundColor} ood-shadow-shallow${props.blok.backgroundColor !== "white" ? "-dark" : ""}`}
                >
          <TileCardContent {...props}/>
        </SbLink>
      </article>
    </SbEditable>
  )
};

export default OodTileCard
