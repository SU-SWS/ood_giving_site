import React from 'react'
import Link from 'gatsby-link'
import SbEditable from 'storyblok-react'
import RichTextField from '../richTextField'
import transformImage from '../../utilities/transformImage'
import Components from "../components"
import { Helmet } from 'react-helmet';


const OodStory = (props) => {
  let processedHeroImg = "";
  if (props.blok.heroImage && props.blok.heroImage.filename.startsWith('http')) {
    processedHeroImg = transformImage(props.blok.heroImage.filename, "/2000x0");
  }

  const options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
  const formattedPublishedDate = new Date(props.blok.publishedDate).toLocaleDateString("en-US", options);

  return (
    <>
      <Helmet><title>{`${props.blok.title} | Giving to Stanford`}</title></Helmet>
      <SbEditable content={props.blok}>
        <main id="main-content">
        <article className={`ood-story su-bg-fog-light`}>
          <header className={`ood-story__header
                  ${((props.blok.heroImage && props.blok.heroImage.filename.startsWith('http')) && props.blok.displayImage === "show-image") ?
                  "ood-story__header--has-image" : `ood-story__header--no-image su-border-color-${props.blok.headerBackgroundColor}`}
          `}>
            {((props.blok.heroImage && props.blok.heroImage.filename.startsWith('http')) && props.blok.displayImage === "show-image") && (
              <figure className={`su-media ood-story__media`}>
                <img src={processedHeroImg} alt={props.blok.heroImage.alt}
                     className={`ood-story__image su-obj-position-h-center-v-${props.blok.visibleVertical}`}
                />
              </figure>
            )}
            <div className={`centered-container flex-container ood-story__header-content`}>
              <div className={`ood-story__header-content-wrapper flex-md-12-of-12 flex-lg-10-of-12 flex-2xl-9-of-12
                   su-bg-${props.blok.headerBoxColor}
                   ${(props.blok.headerBoxColor !== "white" && props.blok.headerBoxColor !== "fog-light")? "su-text-white" : ""}
                   `}>
                <h1 className="ood-story__title su-serif">{props.blok.title}</h1>
                {props.blok.intro && (
                  <p className="su-intro-text ood-story__intro-text">{props.blok.intro}</p>
                )}
              </div>
            </div>
          </header>
          <div className="ood-story__content">
            {props.blok.storyContent && props.blok.storyContent.map((blok) => React.createElement(Components(blok.component), {
              key: blok._uid,
              blok: blok
            }))}
          </div>
          <footer className="ood-story__footer">
            <div className="centered-container flex-container">
              <div className="ood-story__footer-wrapper flex-md-10-of-12 flex-lg-8-of-12 flex-2xl-6-of-12">
                <div className="ood-story__metadata">
                  <p>Author</p>
                  <span>{props.blok.author}</span>
                  <p>Date</p>
                  <span>{formattedPublishedDate}</span>
                </div>
              </div>
            </div>
          </footer>
        </article>
        </main>
        {props.blok.iconCardSection && props.blok.iconCardSection.map((blok) => React.createElement(Components(blok.component), {
          key: blok._uid,
          blok: blok
        }))}
        {props.blok.localFooter && props.blok.localFooter.map((blok) => React.createElement(Components(blok.component), {
          key: blok._uid,
          blok: blok
        }))}
        {props.blok.globalFooter && props.blok.globalFooter.map((blok) => React.createElement(Components(blok.component), {
          key: blok._uid,
          blok: blok
        }))}
      </SbEditable>
    </>
  )
}

export default OodStory