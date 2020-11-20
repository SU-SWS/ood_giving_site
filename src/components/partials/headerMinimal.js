import SbEditable from "storyblok-react"
import React from "react"
import UseWindowSize from "../../hooks/useWindowSize"
import CenteredContainer from "./centeredContainer"
import Heading from "./heading"
import CreateBloks from "../../utilities/createBloks"

/* The Header Minimal component is referenced by the Interior Page type. */

const HeaderMinimal = (props) => {
  let windowSize = UseWindowSize();

  return (
    <SbEditable content={props.blok}>
      <header className={`ood-interior-page__header ood-interior-page__header--minimal su-text-white su-bg-${props.blok.headerBackgroundColor}`}>
        <CenteredContainer flex={true}>
          {(windowSize.width <= 991 && props.blok.layout !== "no-sidebar") &&
          <CreateBloks blokSection={props.blok.contentMenu}/>
          }
          <Heading level={"h1"} classes={"ood-interior-page__title"} serif={true} align={"center"}>{props.blok.title}</Heading>
        </CenteredContainer>
      </header>
    </SbEditable>
  );
}

export default HeaderMinimal
