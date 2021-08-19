import React from "react";
import SbEditable from "storyblok-react";
import RichTextField from "../../utilities/richTextField";
import CreateBloks from "../../utilities/createBloks";
import UseWindowSize from "../../hooks/useWindowSize";
import CenteredContainer from "./centeredContainer";
import Heading from "./heading";
import { config } from "../../utilities/config";
import FullWidthImage from "../media/fullWidthImage";
import FlexCell from "./flexCell";

/* The Header with Fullwidth Image component is referenced by the Interior Page type. */

const HeaderFullWidthImage = (props) => {
  const windowSize = UseWindowSize();

  const full_width_image = props.blok.headerImage.filename ? (
    <FullWidthImage
      {...props}
      filename={props.blok.headerImage.filename}
      classPrefix="ood-interior-page"
      visibleVertical={props.blok.visibleVertical}
      visibleHorizontal="center"
      alt={props.blok.headerImage.alt ?? ""}
    />
  ) : (
    <div className="full-width-image-placeholder" aria-hidden="true" />
  );

  return (
    <SbEditable content={props.blok}>
      <header
        className={`ood-interior-page__header ood-interior-page__header--full-width-image fullwidth
              ${
                props.blok.headerSpacingBottom !== "none"
                  ? `su-mb-${props.blok.headerSpacingBottom}`
                  : ""
              }`}
      >
        {windowSize.width < config.breakpoint.lg &&
          props.blok.layout !== "no-sidebar" && (
            <div className="ood-content-nav__wrapper">
              <CreateBloks blokSection={props.blok.contentMenu} />
            </div>
          )}
        <div className="ood-interior-page__image-logo-wrapper">
          {full_width_image}
          {props.blok.headerLogo.filename && (
            <img
              className="header-logo"
              src={props.blok.headerLogo.filename}
              alt={props.blok.headerLogo.alt}
            />
          )}
        </div>
        <CenteredContainer flex classes="ood-interior-page__header-content">
          <FlexCell
            md={12}
            lg={10}
            classes="ood-interior-page__header-content-wrapper"
          >
            <Heading
              level="h1"
              weight="bold"
              serif
              classes="ood-interior-page__title"
            >
              {props.blok.title}
            </Heading>
            {props.blok.intro && (
              <div className="ood-interior-page__header-intro">
                <RichTextField data={props.blok.intro} />
              </div>
            )}
          </FlexCell>
        </CenteredContainer>
      </header>
    </SbEditable>
  );
};

export default HeaderFullWidthImage;
