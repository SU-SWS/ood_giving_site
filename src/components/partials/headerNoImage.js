import React from "react"
import SbEditable from "storyblok-react"
import RichTextField from "../../utilities/richTextField"
import CenteredContainer from "./centeredContainer"
import Heading from "./heading"

/* The Header No Image component is referenced by the Interior Page and Support page types. */

const HeaderNoImage = (props) => (
  <SbEditable content={props.blok}>
    <header className={`ood-interior-page__header ood-interior-page__header--no-image`}>
      <div className={`ood-interior-page__header-title-wrapper su-pt-7 su-bg-${props.blok.headerBackgroundColor}`}>
        <CenteredContainer>
          <Heading level={"h1"} serif={true} color={"white"} classes={"ood-interior-page__title flex-xl-10-of-12"}>{props.blok.title}</Heading>
        </CenteredContainer>
      </div>
      <CenteredContainer flex={true} classes={"ood-interior-page__header-intro"}>
        <div className={`ood-interior-page__header-intro-wrapper flex-12-of-12 su-bg-white`}>
          {props.blok.intro && (
            <div className="intro-text ood-interior-page__intro flex-xl-10-of-12">
              <RichTextField data={props.blok.intro}/>
            </div>
          )}
        </div>
      </CenteredContainer>
    </header>
  </SbEditable>
);

export default HeaderNoImage
