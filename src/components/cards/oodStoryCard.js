import React from 'react'
import SbEditable from 'storyblok-react'

const OodStoryCard = (props) => {
  const Heading = props.blok.headingLevel;
  return (
    <SbEditable content={props.blok}>
      <article className={`ood-story-card
               ${props.blok.orientation ? "ood-story-card--horizontal" : ""}
               su-bg-${props.blok.backgroundColor}
               ${props.blok.backgroundColor !== "white" ? `su-border-color-${props.blok.backgroundColor}`: ""}
               ${(props.blok.orientation && props.blok.largeCardPadding === true) ? "su-pt-5" : ""}
               ${(props.blok.image.filename && props.blok.showImage === true) ? "ood-story-card--has-image" : "ood-story-card--no-image"}`
      }>
        {(props.blok.image.filename && props.blok.showImage === true) && (
          <figure className={`su-media ood-story-card__media`}>
            <div className={`su-media__wrapper su-aspect-ratio--3x2`}>
              <img className="ood-story-card__image" src={props.blok.image.filename} alt="" />
            </div>
          </figure>
        )}
        <section className={`ood-story-card__contents su-mx-auto`}>
          {props.blok.headline && (
            <Heading className={`ood-story-card__headline su-sans su-semibold`}>
              {props.blok.headline}
            </Heading>
          )}
          {props.blok.teaser &&
            <div className="ood-story-card__body">
              <p>{props.blok.teaser}</p>
            </div>
          }
        </section>
      </article>
    </SbEditable>
  )
};

export default OodStoryCard