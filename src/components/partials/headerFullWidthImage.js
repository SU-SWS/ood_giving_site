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
      visibleVertical={props.blok.visibleVertical}
      visibleHorizontal={"center"}
      alt={props.blok.headerImage.alt ?? ""}
    />
  ) : (<div className={'full-width-image-placeholder'} aria-hidden='true' />);

  return (
    <SbEditable content={props.blok}>
      <header
        className={`ood-interior-page__header ood-interior-page__header--has-image fullwidth`}
      >
        {(windowSize.width < config.breakpoint.md && props.blok.layout !== "no-sidebar") &&
          <div className='su-bg-palo-alto-dark'>
            <CreateBloks blokSection={props.blok.contentMenu}/>
          </div>
        }
        {full_width_image}
        {props.blok.headerLogo.filename &&
          <img
            className={'header-logo'}
            src={props.blok.headerLogo.filename}
            alt={props.blok.headerLogo.alt}
          />
        }
        <CenteredContainer
          flex={true}
          classes={"ood-interior-page__header-content"}
        >
          <FlexCell
            md={12}
            lg={10}
            xxl={9}
            classes={`ood-interior-page__header-content-wrapper`}
          >
            <Heading
              level={"h1"}
              weight={"bold"}
              serif={true}
              classes={"ood-interior-page__title"}
            >
              {props.blok.title}
            </Heading>
            {props.blok.intro &&
              <div className='ood-interior-page__header-intro'>
                <RichTextField data={props.blok.intro}/>
              </div>
            }
          </FlexCell>
        </CenteredContainer>
      </header>
    </SbEditable>
  );
}

export default HeaderFullWidthImage
