import SbEditable from "storyblok-react"
import RichTextField from "../../utilities/richTextField"
import React from "react"
import AspectRatioImage from "../media/aspectRatioImage"
import CreateBloks from "../../utilities/createBloks"
import UseWindowWidth from "../../hooks/useWindowWidth"

/* The Header with Image component is referenced by the Interior Page type. */

const HeaderWithImage = (props) => {
  let windowWidth = UseWindowWidth();

  return (
    <SbEditable content={props.blok}>
      <header className={`ood-interior-page__header ood-interior-page__header--has-image`}>
        <div className={`ood-interior-page__header-title-wrapper su-pt-6 su-pb-5 su-bg-${props.blok.headerBackgroundColor}`}>
          <div className={`centered-container flex-container`}>
            {windowWidth.width <= 991 &&
            <CreateBloks blokSection={props.blok.contentMenu}/>
            }
            <h1 className="ood-interior-page__title flex-lg-6-of-12 flex-xl-5-of-12 flex-2xl-6-of-12 su-serif su-text-white su-text-align-left">{props.blok.title}</h1>
            <AspectRatioImage
              {...props}
              filename={props.blok.headerImage.filename}
              alt={props.blok.headerImage.alt}
              classPrefix={"ood-interior-page__header"}
              otherClasses={"flex-lg-6-of-12 flex-xl-7-of-12 flex-2xl-6-of-12"}
              imageSize={"header"}
              aspectRatio={"3x2"}
            />
          </div>
        </div>
        <div className={`ood-interior-page__header-intro-wrapper su-py-6 su-bg-white`}>
          <div className={`centered-container flex-container`}>
            {props.blok.intro && (
              <div className="intro-text ood-interior-page__intro flex-xl-8-of-12">
                <RichTextField data={props.blok.intro}/>
              </div>
            )}
          </div>
        </div>
      </header>
    </SbEditable>
  );
}

export default HeaderWithImage
