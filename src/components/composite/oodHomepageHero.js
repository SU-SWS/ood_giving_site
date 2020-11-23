import React from 'react'
import SbEditable from 'storyblok-react'
import transformImage from "../../utilities/transformImage";
import { Link } from "gatsby"
import CenteredContainer from "../partials/centeredContainer"

const OodHomepageHero = (props) => {
  let processedImg;
  processedImg = transformImage(props.blok.image.filename, "/2000x0");

  const CtaBoxContent = (props) => (
    <>
      <h2 className={`hero__cta-headline su-text-white su-semibold`}>{props.blok.ctaHeadline}</h2>
      {props.blok.ctaText &&
        <p className={`hero__cta-text su-link--action su-text-white su-semibold su-ml-auto`}>{props.blok.ctaText}</p>
      }
    </>
  );

  return (
    <SbEditable content={props.blok}>
      <div className={`hero su-bg-${props.blok.backgroundColor}`}>
        <figure className="su-media hero__media">
          <div className="su-media__wrapper hero__media-wrapper">
            <img className="hero__image"
                 src={processedImg}
                 alt={props.blok.image.alt ? props.blok.image.alt : ""}
            />
          </div>
        </figure>
        <CenteredContainer flex={true} classes={"hero__content"}>
          <h1 className={`flex-md-10-of-12 flex-lg-7-of-12 hero__splash-text su-semibold su-text-white su-text-focus-in
              su-mod-type-${props.blok.splashTextSize}
              su-after-bg-${props.blok.tabColor}`}>
              {props.blok.splashText}
          </h1>
          {props.blok.link.linktype === "story" &&
            <Link
              to={props.blok.link.cached_url === "home" ? "/" : `/${props.blok.link.cached_url}${props.blok.link.cached_url.endsWith("/") ? "" : "/"}`}
              className={`flex-md-10-of-12 flex-lg-5-of-12 hero__link su-bg-${props.blok.ctaBackgroundColor}`}
            >
              <CtaBoxContent {...props}/>
            </Link>
          }
          {props.blok.link.linktype === "url" &&
            <a href={props.blok.link.url} className={`flex-md-10-of-12 flex-lg-5-of-12 hero__link su-bg-${props.blok.ctaBackgroundColor}`}>
              <CtaBoxContent {...props}/>
            </a>
          }
        </CenteredContainer>
      </div>
    </SbEditable>
  )
}

export default OodHomepageHero
