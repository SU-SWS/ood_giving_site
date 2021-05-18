import React from "react";
import SbEditable from "storyblok-react";
import AspectRatioImage from "../media/aspectRatioImage";
import SbLink from "../partials/sbLink";
import Heading from "../partials/heading";

const CampaignCard = props => {
  return (
    <SbEditable content={props.blok}>
      <article
        className={`campaign-card`}
      >
        <SbLink
          link={props.blok.link}
          classes={``}
        >
          {props.blok.image.filename?.startsWith("http") &&
          props.blok.showImage === true && (
            <AspectRatioImage
              {...props}
              element={"div"}
              filename={props.blok.image.filename}
              alt=""
              classPrefix={"campaign-card"}
              imageSize={"card"}
              aspectRatio={"3x2"}
              visibleHorizontal={props.blok.visibleHorizontal}
              visibleVertical={props.blok.visibleVertical}
            />
          )}
          <div className="campaign-card__contents">
            {props.blok.superheadline && (
              <span className="campaign-card__superhead su-uppercase">
                {props.blok.superheadline}
              </span>
            )}
            {props.blok.headline && (
              <Heading
                level={props.blok.headingLevel}
                defaultLevel={"h3"}
                weight={"semibold"}
                classes={`campaign-card__headline ${
                  props.blok.link.linktype === "url" ? "su-link--external" : ""
                }`}
              >
                {props.blok.headline}
              </Heading>
            )}
          </div>
        </SbLink>
      </article>
    </SbEditable>
  );
};

export default CampaignCard;
