import React from "react"
import SbEditable from "storyblok-react"
import RichTextField from "../../utilities/richTextField"
import CenteredContainer from "./centeredContainer"
import FlexCell from "./flexCell"

/* The Header No Image component is referenced by the Interior Page and Support page types. */

const HeaderNoImage = (props) => (
  <SbEditable content={props.blok}>
    <header className={`ood-interior-page__header ood-interior-page__header--no-image`}>
      <div className={`ood-interior-page__header-title-wrapper su-pt-7 su-bg-${props.blok.headerBackgroundColor}`}>
        <CenteredContainer>
          <FlexCell element={"h1"} xl={10} classes={"ood-interior-page__title su-serif su-text-white"}>{props.blok.title}</FlexCell>
        </CenteredContainer>
      </div>
      <CenteredContainer classes={"ood-interior-page__header-intro"}>
        <div className={`ood-interior-page__header-intro-wrapper su-bg-white`}>
          {props.blok.intro && (
            <FlexCell xl={10} classes={"intro-text ood-interior-page__intro"}>
              <RichTextField data={props.blok.intro}/>
            </FlexCell>
          )}
        </div>
      </CenteredContainer>
    </header>
  </SbEditable>
);

export default HeaderNoImage
