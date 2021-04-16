import React from "react"
import SbEditable from "storyblok-react"
import RichTextField from "../../utilities/richTextField"
import AspectRatioImage from "../media/aspectRatioImage"
import CreateBloks from "../../utilities/createBloks"
import UseWindowSize from "../../hooks/useWindowSize"
import CenteredContainer from "./centeredContainer"
import Heading from "./heading"
import { config } from "../../utilities/config"

/* The Header with Image component is referenced by the Interior Page type. */

const HeaderWithImage = (props) => {
  let windowSize = UseWindowSize();

  return (
    <SbEditable content={props.blok}>
      <header className={`ood-interior-page__header ood-interior-page__header--has-image`}>
        <div className={`ood-interior-page__header-title-wrapper su-pb-5 su-bg-white`}>
          <CenteredContainer flex={true}>
            {(windowSize.width < config.breakpoint.lg && props.blok.layout !== "no-sidebar") &&
              <CreateBloks blokSection={props.blok.contentMenu}/>
            }
            <div className={"header-and-intro"}>
              <Heading level={"h1"} serif={false} color={"black"}
                       classes={"ood-interior-page__title flex-lg-6-of-12 flex-xl-5-of-12 flex-2xl-6-of-12"}>{props.blok.title}</Heading>
              <div className={`ood-interior-page__header-intro-wrapper`}>
                {props.blok.intro && (
                  <div className="flex-lg-6-of-12 flex-xl-5-of-12 flex-2xl-6-of-12">
                    <RichTextField data={props.blok.intro}/>
                  </div>
                )}
              </div>
            </div>
            <AspectRatioImage
              {...props}
              filename={props.blok.headerImage.filename}
              alt={props.blok.headerImage.alt}
              classPrefix={"ood-interior-page__header"}
              otherClasses={"flex-md-9-of-12 flex-lg-6-of-12 flex-xl-7-of-12 flex-2xl-6-of-12 su-ml-auto su-mr-none"}
              imageSize={"header"}
              aspectRatio={"3x2"}
            />
          </CenteredContainer>
          <div className={`ood-interior-page__rectangle flex-md-9-of-12 flex-lg-6-of-12 flex-xl-7-of-12 flex-2xl-6-of-12 su-ml-auto su-mr-none su-bg-${props.blok.headerBackgroundColor}`} />
        </div>
      </header>
    </SbEditable>
  );
}

export default HeaderWithImage
