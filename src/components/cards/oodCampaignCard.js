import React from "react";
import SbEditable from "storyblok-react";
import AspectRatioImage from "../media/aspectRatioImage";
import SbLink from "../partials/sbLink";
import Heading from "../partials/heading";

const OodCampaignCard = props => {
  return (
    <SbEditable content={props.blok}>
      <article
        className={`ood-campaign-card`}
      >
        <SbLink
          link={props.blok.link}
          classes={`ood-campaign-card__link su-block`}
        >
          {props.blok.image.filename?.startsWith("http") &&
          props.blok.showImage === true && (
            <AspectRatioImage
              {...props}
              element={"div"}
              filename={props.blok.image.filename}
              alt=""
              classPrefix={"ood-campaign-card"}
              imageSize={"card"}
              aspectRatio={"3x2"}
              visibleHorizontal={props.blok.visibleHorizontal}
              visibleVertical={props.blok.visibleVertical}
            />
          )}
          <div className="ood-campaign-card__contents">
            {props.blok.superheadline && (
              <span className="ood-campaign-card__superhead su-uppercase su-semibold su-block">
                {props.blok.superheadline}
              </span>
            )}
            {props.blok.headline && (
              <Heading
                level={props.blok.headingLevel}
                defaultLevel={"h3"}
                weight={"semibold"}
                classes={`ood-campaign-card__headline su-mb-none su-gradient-text-${props.blok.headlineColor} ${
                  props.blok.link.linktype === "url" ? "su-link--external" : "ood-campaign-card__headline--internal"
                }`}
              >
                {props.blok.headline}
              </Heading>
            )}

            {props.blok.description && (
              <p className="ood-campaign-card__description su-mb-none su-mt-default su-regular">
                {props.blok.description}
              </p>
            )}
          </div>
        </SbLink>
      </article>
    </SbEditable>
  );
};

export default OodCampaignCard;
