import React from 'react'
import SbEditable from 'storyblok-react'
import transformImage from '../../utilities/transformImage'
import Components from "../components"
import IconCardSection from '../partials/iconCardSection'
import Footer from "../partials/footer";
import StoryCardView from "./oodStoryCardView";
import { Helmet } from 'react-helmet';

const OodStory = (props) => {
  let processedHeroImg;
  processedHeroImg = transformImage(props.blok.heroImage.filename, "/2000x0");

  const dateOptions = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
  let publishedDate;

  if (props.blok.publishedDate) {
    publishedDate = new Date(props.blok.publishedDate).toLocaleDateString("en-US", dateOptions);
  } else if (props.blok.manualDate) {
    publishedDate = props.blok.manualDate;
  }

  const StoryPageView = (props) => (
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
                  <img src={processedHeroImg} alt={props.blok.heroImage.alt ? props.blok.heroImage.alt : ""}
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
                  <h1 className={`ood-story__title su-semibold ood-has-tab-before su-before-bg-${props.blok.tabColor}`}>{props.blok.title}</h1>
                  {props.blok.intro && (
                    <p
                      className="intro-text ood-story__intro-text">{props.blok.intro}</p>
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
              {(props.blok.author || publishedDate) &&
                <div className="centered-container flex-container">
                  <div className="flex-lg-8-of-12 su-mx-auto">
                    {props.blok.cta && props.blok.cta.map((blok) => React.createElement(Components(blok.component), {
                      key: blok._uid,
                      blok: blok
                    }))}
                    <div className="ood-story__metadata su-pb-5">
                      {props.blok.author &&
                        <>
                          <p className="ood-story__metadata-title su-bold su-uppercase">Author</p>
                          <span className="ood-story__metadata-data">{props.blok.author}</span>
                        </>
                      }
                      {publishedDate &&
                        <>
                          <p className="ood-story__metadata-title su-bold su-uppercase">Date</p>
                          <span className="ood-story__metadata-data su-mb-none">{publishedDate}</span>
                        </>
                      }
                    </div>
                  </div>
                </div>
              }
              <IconCardSection {...props}/>
            </footer>
          </article>
        </main>
        <Footer {...props}/>
      </SbEditable>
    </>
  )

  if (props.layout === "story-card") {
    return (
      <StoryCardView {...props} />
    )
  }
  else {
    return (
      <StoryPageView {...props} />
    )
  }
};

export default OodStory
