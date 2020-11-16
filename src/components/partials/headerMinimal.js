import SbEditable from "storyblok-react"
import React from "react"
import CenteredContainer from "./centeredContainer"
import Heading from "./heading"

/* The Header Minimal component is referenced by the Interior Page type. */

const HeaderMinimal = (props) => (
  <SbEditable content={props.blok}>
    <header className={`ood-interior-page__header ood-interior-page__header--minimal su-text-white su-bg-${props.blok.headerBackgroundColor}`}>
      <CenteredContainer>
        <Heading level={"h1"} classes={"ood-interior-page__title"} serif={true} align={"center"}>{props.blok.title}</Heading>
      </CenteredContainer>
    </header>
  </SbEditable>
);

export default HeaderMinimal
