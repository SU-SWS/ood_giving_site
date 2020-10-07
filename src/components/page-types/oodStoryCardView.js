import SbEditable from "storyblok-react";
import React from "react";
import { Link } from "gatsby"
import transformImage from "../../utilities/transformImage"
import AspectRatioImage from "../simple/aspectRatioImage"

const StoryCardView = (props) => {
  const Heading = props.headingLevel ? props.headingLevel : "h3";
  let processedCardImg;
  processedCardImg = transformImage(props.blok.heroImage.filename, "/800x0");

  return (
    <SbEditable content={props.blok}>
      <article className={`ood-story-card
                 ${props.orientation === "horizontal" ? "ood-story-card--horizontal" : ""}
                 ${(props.blok.heroImage.filename != null && props.hideImage === false) ? "ood-story-card--has-image" : "ood-story-card--no-image"}`
      }>
        <Link
          to={`/${props.storyLink}/`}
          className={`ood-story-card__link su-bg-${props.backgroundColor} su-text-no-underline
            ${props.backgroundColor === "white" ? "su-border-color-black-10" : "su-border-color-black-11"}`}
        >
          {(props.blok.heroImage.filename != null && props.hideImage === false) && (
            <AspectRatioImage
              {...props}
              filename={props.blok.heroImage.filename}
              alt={props.blok.heroImage.alt}
              classPrefix={"ood-story-card"}
              imageSize={`${props.orientation ? `${props.orientation}-card` : "card"}`}
              aspectRatio={"3x2"}
            />
          )}
          <section
            className={`ood-story-card__contents su-mx-auto ood-has-tab-before su-px-2 su-pb-5`}>
            {(props.blok.shortTitle || props.blok.title) && (
              <Heading className={`ood-story-card__headline su-sans su-semibold su-text-black`}>
                {props.blok.shortTitle ? props.blok.shortTitle : props.blok.title}
              </Heading>
            )}
            {(props.blok.teaser || props.blok.intro) &&
            <p className="ood-story-card__body su-text-black su-regular">{props.blok.teaser ? props.blok.teaser : props.blok.intro}</p>
            }
          </section>
        </Link>
      </article>
    </SbEditable>
  )
};

export default StoryCardView
