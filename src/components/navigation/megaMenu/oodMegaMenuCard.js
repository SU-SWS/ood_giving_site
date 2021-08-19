import React from "react";
import SbEditable from "storyblok-react";
import AspectRatioImage from "../../media/aspectRatioImage";
import SbLink from "../../partials/sbLink";

const OodMegaMenuCard = (props) => (
  <SbEditable content={props.blok}>
    <article className="ood-mega-nav__card">
      <SbLink
        link={props.blok.link}
        classes="ood-mega-nav__card__link su-no-underline"
      >
        {props.blok.image.filename != null && (
          <AspectRatioImage
            {...props}
            element="div"
            filename={props.blok.image.filename}
            alt=""
            classPrefix="ood-mega-nav__card"
            imageSize="card"
            aspectRatio="3x2"
          />
        )}
        <div
          className={`ood-mega-nav__card-content su-text-white su-bg-${props.blok.backgroundColor}`}
        >
          <h3 className="ood-mega-nav__card-headline su-serif su-bold">
            {props.blok.headline}
          </h3>
          <p
            className={`ood-mega-nav__card-cta su-after-bg-white su-after-bg-hocus-white su-mb-none
          ${
            props.blok.link.linktype === "url"
              ? "su-link--external"
              : "su-link--action"
          }`}
          >
            {props.blok.ctaText}
          </p>
        </div>
      </SbLink>
    </article>
  </SbEditable>
);

export default OodMegaMenuCard;
