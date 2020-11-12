import SbEditable from "storyblok-react"
import RichTextField from "../../utilities/richTextField"
import React from "react"
import AspectRatioImage from "../media/aspectRatioImage"
import CenteredContainer from "./centeredContainer"
import Heading from "./heading"

/* The Header with Image component is referenced by the Interior Page type. */

const HeaderWithImage = (props) => (
  <SbEditable content={props.blok}>
    <header className={`ood-interior-page__header ood-interior-page__header--has-image`}>
      <div className={`ood-interior-page__header-title-wrapper su-pt-6 su-pb-5 su-bg-${props.blok.headerBackgroundColor}`}>
        <CenteredContainer flex={true}>
          <Heading level={"h1"} serif={true} color={"white"}
                   classes={"ood-interior-page__title flex-lg-6-of-12 flex-xl-5-of-12 flex-2xl-6-of-12"}>{props.blok.title}</Heading>
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
      </div>
      <div className={`ood-interior-page__header-intro-wrapper su-py-6 su-bg-white`}>
        <CenteredContainer flex={true}>
          {props.blok.intro && (
            <div className="intro-text ood-interior-page__intro flex-xl-8-of-12">
              <RichTextField data={props.blok.intro}/>
            </div>
          )}
        </CenteredContainer>
      </div>
    </header>
  </SbEditable>
);

export default HeaderWithImage
