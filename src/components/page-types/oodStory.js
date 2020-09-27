import React from 'react'
import SbEditable from 'storyblok-react'
import RichTextField from '../../utilities/richTextField'
import transformImage from '../../utilities/transformImage'
import Components from "../components"
import IconCardSection from '../partials/iconCardSection'
import OodStoryCard from '../cards/oodStoryCard'
import Footer from "../partials/footer";
import { Helmet } from 'react-helmet';
import {Link} from "gatsby";


const OodStory = (props) => {
  let processedHeroImg = "";
  if (props.blok.heroImage.filename != null) {
    processedHeroImg = transformImage(props.blok.heroImage.filename, "/2000x0");
  }

  const options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
  const formattedPublishedDate = new Date(props.blok.publishedDate).toLocaleDateString("en-US", options);

  if (props.layout !== "story-card") {
    return (
      <>
        <SbEditable content={props.blok}>
          <Helmet><title>{`${props.blok.title} | Giving to Stanford`}</title>
          </Helmet>
          {props.blok.localHeader && props.blok.localHeader.map((blok) => React.createElement(Components(blok.component), {
            key: blok._uid,
            blok: blok
          }))}
          <main id="main-content">
            <article className={`ood-story su-bg-white`}>
              <header className={`ood-story__header
                    ${(props.blok.heroImage.filename != null && props.blok.displayImage === "show-image") ?
                "ood-story__header--has-image su-bg-white" : `ood-story__header--no-image su-bg-white su-border-color-${props.blok.headerBackgroundColor}`}
            `}>
                {(props.blok.heroImage.filename != null && props.blok.displayImage === "show-image") && (
                  <figure className={`su-media ood-story__media`}>
                    <img src={processedHeroImg} alt={props.blok.heroImage.alt}
                         className={`ood-story__image su-obj-position-h-center-v-${props.blok.visibleVertical}`}
                    />
                  </figure>
                )}
                <div
                  className={`centered-container flex-container ood-story__header-content`}>
                  <div className={`ood-story__header-content-wrapper flex-md-12-of-12 flex-lg-10-of-12 flex-2xl-9-of-12
                     su-bg-${props.blok.headerBoxColor}
                     ${(props.blok.headerBoxColor !== "white" && props.blok.headerBoxColor !== "fog-light") ? "su-text-white" : ""}
                     `}>
                    <h1
                      className={`ood-story__title su-semibold ood-has-tab-before su-before-bg-${props.blok.tabColor}`}>{props.blok.title}</h1>
                    {props.blok.intro && (
                      <p
                        className="su-intro-text ood-story__intro-text">{props.blok.intro}</p>
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
              <footer className="ood-story__main-footer su-bg-white">
                <div className="centered-container flex-container">
                  <div className="flex-md-10-of-12 flex-lg-8-of-12 su-mx-auto">
                    <div className="ood-story__metadata su-pb-5">
                      <p
                        className="ood-story__metadata-title su-bold su-uppercase">Author</p>
                      <span
                        className="ood-story__metadata-data">{props.blok.author}</span>
                      <p
                        className="ood-story__metadata-title su-bold su-uppercase">Date</p>
                      <span
                        className="ood-story__metadata-data su-mb-none">{formattedPublishedDate}</span>
                    </div>
                  </div>
                </div>
                <IconCardSection {...props}/>
              </footer>
            </article>
          </main>
          <Footer {...props}/>
        </SbEditable>
      </>
    )
  }
  else {
    return (
      <SbEditable content={props.blok}>
        <article className={`ood-story-card
                 ${props.orientation === "horizontal" ? "ood-story-card--horizontal" : ""}
                 ${(props.blok.heroImage.filename != null && props.hideimage === false) ? "ood-story-card--has-image" : "ood-story-card--no-image"}`
        }>
          <Link
            to={`/`}
            className={`ood-story-card__link su-bg-${props.blok.backgroundColor} su-text-no-underline
            ${props.blok.backgroundColor === "white" ? "su-border-color-black-10" : "su-border-color-black-11"}`}
          >
            {(props.blok.heroImage.filename != null && props.hideimage === false) && (
              <figure className={`su-media ood-story-card__media`}>
                <div className={`su-media__wrapper su-aspect-ratio--3x2`}>
                  <img className="ood-story-card__image"
                       src={props.blok.heroImage.filename}
                       alt={props.blok.heroImage.alt}/>
                </div>
              </figure>
            )}
            <section
              className={`ood-story-card__contents su-mx-auto ood-has-tab-before su-px-2 su-pb-4`}>
              {props.blok.title && (
                <h3 className={`ood-story-card__headline su-sans su-semibold su-mod-type-3 su-text-black
                         `}>
                  {props.blok.title}
                </h3>
              )}
              {props.blok.intro &&
              <p
                className="ood-story-card__body su-text-black su-regular">{props.blok.intro}
              </p>
              }
            </section>
          </Link>
        </article>
      </SbEditable>
    )
  }
};

export default OodStory