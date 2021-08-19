import React from "react";
import SbEditable from "storyblok-react";
import AspectRatioImage from "../media/aspectRatioImage";
import Heading from "../partials/heading";
import SbLink from "../partials/sbLink";

const OodStoryCard = (props) => (
  <SbEditable content={props.blok}>
    <article
      className={`ood-story-card
               ${props.blok.orientation ? "ood-story-card--horizontal" : ""}
               ${
                 props.blok.image.filename?.startsWith("http") &&
                 props.blok.showImage === true
                   ? "ood-story-card--has-image"
                   : "ood-story-card--no-image"
               }`}
    >
      <SbLink
        link={props.blok.link}
        classes={`ood-story-card__link su-bg-${
          props.blok.backgroundColor
        } su-text-no-underline
                ${
                  props.blok.backgroundColor === "white"
                    ? "su-border-color-black-10"
                    : "su-border-color-black-11"
                }`}
      >
        {props.blok.image.filename?.startsWith("http") &&
          props.blok.showImage === true && (
            <AspectRatioImage
              {...props}
              element="div"
              filename={props.blok.image.filename}
              alt=""
              classPrefix="ood-story-card"
              imageSize={`${
                props.blok.orientation
                  ? `${props.blok.orientation}-card`
                  : "card"
              }`}
              aspectRatio="3x2"
              visibleHorizontal={props.blok.visibleHorizontal}
              visibleVertical={props.blok.visibleVertical}
            />
          )}
        <div className="ood-story-card__contents su-mx-auto ood-has-tab-before su-px-2 su-pb-4">
          {props.blok.headline && (
            <Heading
              level={props.blok.headingLevel}
              defaultLevel="h3"
              color="black"
              weight="semibold"
              classes={`ood-story-card__headline su-sans ${
                props.blok.link.linktype === "url"
                  ? "su-link--external su-after-bg-digital-red" +
                    " su-after-bg-hocus-digital-red"
                  : ""
              }`}
            >
              {props.blok.headline}
            </Heading>
          )}
          {props.blok.teaser && (
            <p className="ood-story-card__body su-text-black su-regular">
              {props.blok.teaser}
            </p>
          )}
        </div>
      </SbLink>
    </article>
  </SbEditable>
);

export default OodStoryCard;
