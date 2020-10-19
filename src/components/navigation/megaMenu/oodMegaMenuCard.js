import React from 'react'
import Link from 'gatsby-link'
import SbEditable from 'storyblok-react'
import AspectRatioImage from "../../media/aspectRatioImage"

const MegaMenuCardContent = (props) => (
  <SbEditable content={props.blok}>
    {(props.blok.image.filename != null) && (
      <AspectRatioImage
        {...props}
        filename={props.blok.image.filename}
        alt={props.blok.image.alt}
        classPrefix={"ood-mega-nav__card"}
        imageSize={"card"}
        aspectRatio={"3x2"}
      />
    )}
    <section
      className={`ood-mega-nav__card-content su-text-white su-bg-${props.blok.backgroundColor}`}>
      <h3 className="ood-mega-nav__card-headline su-semibold">{props.blok.headline}</h3>
      <p className={`ood-mega-nav__card-cta su-after-bg-white su-after-bg-hocus-white su-mb-none
          ${props.blok.link.linktype === "url" ? "su-link--external" : "su-link--action"}`}>{props.blok.ctaText}</p>
    </section>
  </SbEditable>
);

const OodMegaMenuCard = (props) => (
  <SbEditable content={props.blok}>
    <article className={`ood-mega-nav__card`}>
      {props.blok.link.linktype === "story" &&
        <Link
          to={props.blok.link.cached_url === "home" ? "/" : `/${props.blok.link.cached_url}${props.blok.link.cached_url.endsWith("/") ? "" : "/"}`}
          className={`ood-mega-nav__card__link su-no-underline`}
        >
          <MegaMenuCardContent {...props}/>
        </Link>
      }
      {props.blok.link.linktype === "url" &&
        <a href={props.blok.link.url} className={`ood-mega-nav__card__link su-no-underline`}>
          <MegaMenuCardContent {...props}/>
        </a>
      }
    </article>
  </SbEditable>
)

export default OodMegaMenuCard
