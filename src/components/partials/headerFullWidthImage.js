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

/* The Header with Image component is referenced by the Interior Page type. */

const HeaderFullWidthImage = (props) => {
  let windowSize = UseWindowSize();

  return (
    <SbEditable content={props.blok}>
      <main id="main-content">
        <article className={`ood-story su-bg-white`}>
          <header
            className={`ood-interior-page__header ood-interior-page__header--has-image fullwidth su-bg-white su-border-color-${props.blok.headerBackgroundColor}`}
          >
            {(windowSize.width < config.breakpoint.md && props.blok.layout !== "no-sidebar") &&
              <div className='su-bg-palo-alto-dark'>
                <CreateBloks blokSection={props.blok.contentMenu}/>
              </div>
            }
            <FullWidthImage
              {...props}
              filename={props.blok.headerImage.filename}
              classPrefix={"ood-interior-page"}
              visibleVertical={"center"}
              visibleHorizontal={"center"}
              alt={props.blok.headerImage.alt ?? ""}
            />
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
