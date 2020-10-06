import SbEditable from "storyblok-react";
import RichTextField from "../../utilities/richTextField";
import React from "react";

const HeaderWithImage = (props) => (
  <SbEditable content={props.blok}>
    <header className={`ood-interior-page__header ood-interior-page__header--has-image`}>
      <div className={`ood-interior-page__header-title-wrapper su-pt-6 su-pb-5 su-bg-${props.blok.headerBackgroundColor}`}>
        <div className={`centered-container flex-container`}>
          <h1 className="ood-interior-page__title flex-lg-6-of-12 flex-xl-5-of-12 flex-2xl-6-of-12 su-serif su-text-white su-text-align-left">{props.blok.title}</h1>
          <figure className="su-media flex-lg-6-of-12 flex-xl-7-of-12 flex-2xl-6-of-12 ood-interior-page__header-media">
            <div className="su-media__wrapper su-aspect-ratio su-aspect-ratio--3x2">
              <img className="ood-interior-page__image" src={props.blok.headerImage.filename} alt="" />
            </div>
          </figure>
        </div>
      </div>
      <div className={`ood-interior-page__header-intro-wrapper su-py-6 su-bg-white`}>
        <div className={`centered-container flex-container`}>
          {props.blok.intro && (
            <div className="su-intro-text ood-interior-page__intro flex-xl-8-of-12">
              <RichTextField data={props.blok.intro}/>
            </div>
          )}
        </div>
      </div>
    </header>
  </SbEditable>
);

export default HeaderWithImage