import React from 'react'
import SbEditable from 'storyblok-react'
import transformImage from "../../utilities/transformImage";
import { Link } from "gatsby"
import CenteredContainer from "../partials/centeredContainer"

const OodHomepageHero = (props) => {
  let processedImg;
  processedImg = transformImage(props.blok.image.filename, "/2000x0");

  const CtaBoxContent = (props) => (
    <SbEditable content={props.blok}>
      <h2 className={`ood-hero-home__cta-headline su-text-white su-semibold`}>{props.blok.ctaHeadline}</h2>
      {props.blok.ctaText &&
        <p className={`ood-hero-home__cta-text su-link--action su-text-white su-semibold su-ml-auto`}>{props.blok.ctaText}</p>
      }
    </SbEditable>
  );

  return (
    <SbEditable content={props.blok}>
      <div className={`ood-hero-home su-bg-${props.blok.backgroundColor}`}>
        <figure className="su-media ood-hero-home__media">
          <div className="su-media__wrapper ood-hero-home__media-wrapper">
            <img className="ood-hero-home__image"
                 src={processedImg}
                 alt={props.blok.image.alt ? props.blok.image.alt : ""}
            />
          </div>
        </figure>
        <CenteredContainer flex={true} classes={"ood-hero-home__content"}>
          <h1 className={`flex-lg-7-of-12 ood-hero-home__splash-text su-semibold su-text-white su-text-focus-in
              su-mod-type-${props.blok.splashTextSize}
              su-after-bg-${props.blok.tabColor}`}>
              {props.blok.splashText}
          </h1>
          {props.blok.link.linktype === "story" &&
            <Link
              to={props.blok.link.cached_url === "home" ? "/" : `/${props.blok.link.cached_url}${props.blok.link.cached_url.endsWith("/") ? "" : "/"}`}
              className={`flex-lg-5-of-12 ood-hero-home__link su-bg-${props.blok.ctaBackgroundColor}`}
            >
              <CtaBoxContent {...props}/>
            </Link>
          }
          {props.blok.link.linktype === "url" &&
            <a href={props.blok.link.url} className={`flex-lg-5-of-12 ood-hero-home__link su-bg-${props.blok.ctaBackgroundColor}`}>
              <CtaBoxContent {...props}/>
            </a>
          }
        </CenteredContainer>
      </div>
    </SbEditable>
  )
}

export default OodHomepageHero
