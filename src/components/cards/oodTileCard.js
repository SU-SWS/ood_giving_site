import React from 'react'
import SbEditable from 'storyblok-react'
import AspectRatioImage from "../media/aspectRatioImage"
import SbLink from "../partials/sbLink"
import Heading from "../partials/heading"

const OodTileCard = (props) => {
  return (
    <SbEditable content={props.blok}>
      <article className={`ood-tile-card
        ${(props.blok.image.filename != null && props.blok.showImage === true) ? "ood-tile-card--has-image" : "ood-tile-card--no-image"}
        ${props.blok.backgroundColor !== "white" ? "su-text-white" : ""}`
      }>
        <SbLink link={props.blok.link}
                classes={`ood-tile-card__link su-bg-${props.blok.backgroundColor} ood-shadow-shallow${props.blok.backgroundColor !== "white" ? "-dark" : ""}`}
                >
          {(props.blok.image.filename != null && props.blok.showImage === true) && (
            <AspectRatioImage
              {...props}
              filename={props.blok.image.filename}
              alt=""
              classPrefix={"ood-tile-card"}
              imageSize={"card"}
              aspectRatio={"3x2"}
              visibleHorizontal={props.blok.visibleHorizontal}
              visibleVertical={props.blok.visibleVertical}
            />
          )}
          <section className="ood-tile-card__contents">
            {props.blok.superheadline && (
              <span className="ood-tile-card__superhead su-uppercase">{props.blok.superheadline}</span>
            )}
            {props.blok.headline && (
              <Heading level={props.blok.headingLevel} defaultLevel={"h3"} weight={"semibold"}
                       classes={`ood-tile-card__headline ${props.blok.link.linktype === "url" ? "su-link--external" : ""}`}>{props.blok.headline}</Heading>
            )}
          </section>
        </SbLink>
      </article>
    </SbEditable>
  )
};

export default OodTileCard
