import React from "react";
import SbEditable from "storyblok-react";
import CenteredContainer from "../partials/centeredContainer";
import Heading from "../partials/heading";
import SbLink from "../partials/sbLink";
import FullWidthImage from "../media/fullWidthImage";

const OodHomepageHero = (props) => {
  return (
    <SbEditable content={props.blok}>
      <div className={`hero su-bg-${props.blok.backgroundColor}`}>
        {props.blok.image.filename?.startsWith("http") && (
          <FullWidthImage
            {...props}
            filename={props.blok.image.filename}
            classPrefix={"hero"}
            visibleVertical={props.blok.visibleVertical}
          />
        )}
        <CenteredContainer flex={true} classes={"hero__content"}>
          <Heading
            level={"h1"}
            color={"white"}
            weight={"semibold"}
            classes={`hero__splash-text flex-md-10-of-12 flex-lg-7-of-12 su-text-focus-in su-mod-type-${props.blok.splashTextSize} su-after-bg-${props.blok.tabColor}`}
          >
            {props.blok.splashText}
          </Heading>
          <SbLink
            link={props.blok.link}
            classes={`hero__link flex-md-10-of-12 flex-lg-5-of-12 su-bg-${props.blok.ctaBackgroundColor}`}
          >
            <Heading
              level={"h2"}
              color={"white"}
              weight={"semibold"}
              classes={"hero__cta-headline"}
            >
              {props.blok.ctaHeadline}
            </Heading>
            {props.blok.ctaText && (
              <p
                className={`hero__cta-text su-link--action su-text-white su-semibold su-ml-auto`}
              >
                {props.blok.ctaText}
              </p>
            )}
          </SbLink>
        </CenteredContainer>
      </div>
    </SbEditable>
  );
};

export default OodHomepageHero;
