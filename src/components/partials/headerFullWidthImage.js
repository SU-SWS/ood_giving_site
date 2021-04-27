import React from "react"
import SbEditable from "storyblok-react"
import RichTextField from "../../utilities/richTextField"
import CreateBloks from "../../utilities/createBloks"
import UseWindowSize from "../../hooks/useWindowSize"
import CenteredContainer from "./centeredContainer"
import Heading from "./heading"
import { config } from "../../utilities/config"
import FullWidthImage from "../media/fullWidthImage";
import FlexCell from "./flexCell";
import AspectRatioImage from "../media/aspectRatioImage";

/* The Header with Image component is referenced by the Interior Page type. */

const HeaderFullWidthImage = (props) => {
  let windowSize = UseWindowSize();

  const full_width_image = props.blok.headerImage.filename ? (
    <FullWidthImage
      {...props}
      filename={props.blok.headerImage.filename}
      classPrefix={"ood-interior-page"}
      visibleVertical={"center"}
      visibleHorizontal={"center"}
      alt={props.blok.headerImage.alt ?? ""}
    />
  ) : (<div className={'full-width-image-placeholder'} />);

  return (
    <SbEditable content={props.blok}>
      <main id="main-content">
        <article className={`ood-story su-bg-white ood-shadow-shallow`}>
          <header
            className={`ood-interior-page__header ood-interior-page__header--has-image fullwidth su-bg-white su-border-color-${props.blok.headerBackgroundColor}`}
          >
            {(windowSize.width < config.breakpoint.md && props.blok.layout !== "no-sidebar") &&
              <div className='su-bg-palo-alto-dark'>
                <CreateBloks blokSection={props.blok.contentMenu}/>
              </div>
            }
            {full_width_image}
            {props.blok.headerLogo.filename &&
              <div className={'headerLogo'}>
                <img
                  className={`ood-media__image
               ${props.classPrefix ? `${props.classPrefix}__image` : ""}
               su-obj-position-h-center-v-top`}
                  src={props.blok.headerLogo.filename}
                  alt={props.blok.headerLogo.alt}
                />
              </div>
            }
            <CenteredContainer
              flex={true}
              classes={"ood-interior-page__header-content"}
            >
              <FlexCell
                md={12}
                lg={10}
                xxl={9}
                classes={`ood-interior-page__header-content-wrapper
                         su-bg-${props.blok.headerBackgroundColor}
                         ${
                            props.blok.headerBackgroundColor !== "white"
                            && props.blok.headerBackgroundColor !== "fog-light" ? "su-text-white" : ""
                          }
                       `}
              >
                <Heading
                  level={"h1"}
                  weight={"semibold"}
                  classes={`ood-story__title ood-has-tab-before su-before-bg-${props.blok.headerBackgroundColor}`}
                >
                  {props.blok.title}
                </Heading>
                {props.blok.intro && (
                  <RichTextField data={props.blok.intro}/>
                )}
              </FlexCell>
            </CenteredContainer>
          </header>
        </article>
      </main>
    </SbEditable>
  );
}

export default HeaderFullWidthImage
