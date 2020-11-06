import SbEditable from "storyblok-react"
import React from "react"
import CenteredContainer from "./centeredContainer"

/* The Header Minimal component is referenced by the Interior Page type. */

const HeaderMinimal = (props) => (
  <SbEditable content={props.blok}>
    <header className={`ood-interior-page__header ood-interior-page__header--minimal su-text-white su-bg-${props.blok.headerBackgroundColor}`}>
      <CenteredContainer>
        <h1 className="ood-interior-page__title su-serif su-text-align-center">{props.blok.title}</h1>
      </CenteredContainer>
    </header>
  </SbEditable>
);

export default HeaderMinimal
