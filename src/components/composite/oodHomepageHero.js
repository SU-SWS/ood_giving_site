import React from 'react'
import SbEditable from 'storyblok-react'
import transformImage from "../../utilities/transformImage";
import CenteredContainer from "../partials/centeredContainer"
import Heading from "../partials/heading"
import SbLink from "../partials/sbLink"

const OodHomepageHero = (props) => {
  let processedImg;
  processedImg = transformImage(props.blok.image.filename, "/2000x0");

  return (
    <SbEditable content={props.blok}>
      <div className={`hero su-bg-${props.blok.backgroundColor}`}>
        <figure className="su-media hero__media">
            <img src={processedImg}
                 alt={props.blok.image.alt ? props.blok.image.alt : ""}
                 className={`hero__image su-obj-position-h-${props.blok.visibleHorizontal}-v-${props.blok.visibleVertical}`}
            />
        </figure>
        <CenteredContainer flex={true} classes={"hero__content"}>
          <Heading level={"h1"} color={"white"} weight={"semibold"}
                   classes={`hero__splash-text flex-md-10-of-12 flex-lg-7-of-12 su-text-focus-in su-mod-type-${props.blok.splashTextSize} su-after-bg-${props.blok.tabColor}`}>
            {props.blok.splashText}</Heading>
          <SbLink link={props.blok.link} classes={`hero__link flex-md-10-of-12 flex-lg-5-of-12 su-bg-${props.blok.ctaBackgroundColor}`}>
            <Heading level={"h2"} color={"white"} weight={"semibold"} classes={"hero__cta-headline"}>{props.blok.ctaHeadline}</Heading>
            {props.blok.ctaText &&
              <p className={`hero__cta-text su-link--action su-text-white su-semibold su-ml-auto`}>{props.blok.ctaText}</p>
            }
          </SbLink>
        </CenteredContainer>
      </div>
    </SbEditable>
  )
}

export default OodHomepageHero
