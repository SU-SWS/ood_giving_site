import React from "react";
import SbEditable from "storyblok-react";
import CreateBloks from "../../utilities/createBloks";
import Heading from "./heading";
import FullWidthImage from "../media/fullWidthImage";
import FlexCell from "./flexCell";

/* The Hero section with fullwidth image is referenced by the Campaign Page type. */

const CampaignFullWidthHero = (props) => {
  const full_width_image =
    props.blok.image?.filename != null ? (
      <FullWidthImage
        {...props}
        filename={props.blok.image?.filename}
        classPrefix={"campaign-page"}
        visibleVertical={props.blok.visibleVertical}
        visibleHorizontal={"center"}
        alt={props.blok.image?.alt ?? ""}
      />
    ) : (
      <div className={"full-width-image-placeholder"} aria-hidden="true" />
    );

  return (
    <SbEditable content={props.blok}>
      <header
        className={`campaign-page__header campaign-page__header--fullwidth-image`}
      >
        <div className="campaign-page__image-logo-wrapper">
          {full_width_image}
          {props.blok.logo?.filename != null && (
            <img
              className={"hero-logo"}
              src={props.blok.logo?.filename}
              alt={props.blok.logo?.alt}
            />
          )}
        </div>
        <div className={"campaign-page__header-content"}>
          <div className={`campaign-page__header-content-wrapper`}>
            <Heading
              level={"h1"}
              weight={"regular"}
              serif={true}
              classes={"campaign-page__title"}
            >
              {props.blok.title}
            </Heading>
            {props.blok.intro && (
              <p className="campaign-page__header-intro su-mb-none">
                {props.blok.intro}
              </p>
            )}
            {props.blok.heroCta && (
              <CreateBloks blokSection={props.blok.heroCta} />
            )}
          </div>
        </div>
      </header>
    </SbEditable>
  );
};

export default CampaignFullWidthHero;
