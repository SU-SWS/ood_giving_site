import React from 'react'
import { Link } from "gatsby"
import SbEditable from 'storyblok-react'

const OodStoryCard = (props) => {
  const Heading = props.blok.headingLevel;
  const StoryCardContent = (props) => (
    <SbEditable content={props.blok}>
      {(props.blok.image.filename && props.blok.showImage === true) && (
        <figure className={`su-media ood-story-card__media`}>
          <div className={`su-media__wrapper su-aspect-ratio--3x2`}>
            <img className="ood-story-card__image" src={props.blok.image.filename} alt={props.blok.image.alt}/>
          </div>
        </figure>
      )}
      <section className={`ood-story-card__contents su-mx-auto ood-has-tab-before su-px-2 su-pb-4`}>
        {props.blok.headline && (
          <Heading className={`ood-story-card__headline su-sans su-semibold su-mod-type-3 su-text-black
                   ${props.blok.link.linktype === "url" ? "su-link--external su-after-bg-digital-red su-after-bg-hocus-digital-red" : ""}`}>
            {props.blok.headline}
          </Heading>
        )}
        {props.blok.teaser &&
          <p className="ood-story-card__body su-text-black su-regular">{props.blok.teaser}</p>
        }
      </section>
    </SbEditable>
  );

  return (
    <SbEditable content={props.blok}>
      <article className={`ood-story-card
               ${props.blok.orientation ? "ood-story-card--horizontal" : ""}
               ${(props.blok.image.filename && props.blok.showImage === true) ? "ood-story-card--has-image" : "ood-story-card--no-image"}`
      }>
        {props.blok.link.linktype === "story" &&
          <Link
            to={props.blok.link.cached_url === "home" ? "/" : `/${props.blok.link.cached_url}${props.blok.link.cached_url.endsWith("/") ? "" : "/"}`}
            className={`ood-story-card__link su-bg-${props.blok.backgroundColor} su-text-no-underline
            ${props.blok.backgroundColor === "white" ? "su-border-color-black-10" : "su-border-color-black-11"}`}
          >
            <StoryCardContent {...props}/>
          </Link>
        }
        {props.blok.link.linktype === "url" &&
          <a href={props.blok.link.url}
             className={`ood-story-card__link su-bg-${props.blok.backgroundColor} su-text-no-underline
             ${props.blok.backgroundColor === "white" ? "su-border-color-black-10" : "su-border-color-black-11"}`}
          >
            <StoryCardContent {...props}/>
          </a>
        }
      </article>
    </SbEditable>
  )
};

export default OodStoryCard
