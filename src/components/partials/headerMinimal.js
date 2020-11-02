import SbEditable from "storyblok-react"
import React from "react"

/* The Header Minimal component is referenced by the Interior Page type. */

const HeaderMinimal = (props) => (
  <SbEditable content={props.blok}>
    <header className={`ood-interior-page__header ood-interior-page__header--minimal su-text-white su-bg-${props.blok.headerBackgroundColor}`}>
      <div className={`centered-container`}>
        <h1 className="ood-interior-page__title su-serif su-text-align-center">{props.blok.title}</h1>
      </div>
    </header>
  </SbEditable>
);

export default HeaderMinimal
