import React from 'react'
import Link from 'gatsby-link'
import SbEditable from 'storyblok-react'
import RichTextField from '../richTextField'
import Components from "../components"
import { Helmet } from 'react-helmet';

const HeaderWithImage = (props) => (
  <SbEditable content={props.blok}>
    <header className={`ood-interior-page__header ood-interior-page__header--has-image`}>
      <div className={`ood-interior-page__header-title-wrapper su-py-6 su-bg-${props.blok.headerBackgroundColor}`}>
        <div className={`centered-container flex-container`}>
          <h1 className="ood-interior-page__title flex-lg-5-of-12 flex-xl-5-of-12 flex-2xl-6-of-12 su-serif su-text-white su-text-align-left">{props.blok.title}</h1>
          <figure className="su-media flex-lg-7-of-12 flex-xl-7-of-12 flex-2xl-6-of-12 ood-interior-page__header-media">
            <div className="su-media__wrapper su-aspect-ratio su-aspect-ratio--3x2">
              <img className="ood-interior-page__image" src={props.blok.headerImage.filename ? props.blok.headerImage.filename : ""} alt="" />
            </div>
          </figure>
        </div>
      </div>
      <div className={`ood-interior-page__header-intro-wrapper su-py-6 su-bg-white`}>
        <div className={`centered-container flex-container`}>
          <p className="su-intro-text ood-interior-page__intro flex-xl-8-of-12">{props.blok.intro}</p>
        </div>
      </div>
    </header>
  </SbEditable>
)

const HeaderNoImage = (props) => (
  <SbEditable content={props.blok}>
    <header className={`ood-interior-page__header ood-interior-page__header`}>
      <div className={`ood-interior-page__header-title-wrapper su-pt-7 su-bg-${props.blok.headerBackgroundColor}`}>
        <div className={`centered-container`}>
          <h1 className="ood-interior-page__title flex-xl-10-of-12 su-serif su-text-white su-text-align-center">{props.blok.title}</h1>
        </div>
      </div>
      <div className={`centered-container flex-container ood-interior-page__header-content`}>
        <div className={`ood-interior-page__header-content-wrapper flex-12-of-12
                       su-bg-white su-text-align-center`}>
          {props.blok.intro && (
            <p className="su-intro-text ood-interior-page__intro flex-xl-10-of-12">{props.blok.intro}</p>
          )}
        </div>
      </div>
    </header>
  </SbEditable>
)

const HeaderMinimal = (props) => (
  <SbEditable content={props.blok}>
    <header className={`ood-interior-page__header ood-interior-page__header--minimal su-bg-fog-light su-py-7`}>
      <div className={`centered-container`}>
        <h1 className="ood-interior-page__title su-serif su-text-align-left">{props.blok.title}</h1>
      </div>
    </header>
  </SbEditable>
)

const OodInteriorPage = (props) => {
  return (
    <>
      <Helmet><title>{`${props.blok.title} | Giving to Stanford`}</title></Helmet>
      <SbEditable content={props.blok}>
        {props.blok.localHeader && props.blok.localHeader.map((blok) => React.createElement(Components(blok.component), {
          key: blok._uid,
          blok: blok
        }))}
        <main id="main-content"
              className={`ood-interior-page ood-interior-page--${props.blok.headerStyle}`}
        >
          <article className={`su-bg-fog-light`}>
            {props.blok.headerStyle === "has-image" &&
              <HeaderWithImage {...props}/>
            }
            {props.blok.headerStyle === "no-image" &&
              <HeaderNoImage {...props}/>
            }
            {props.blok.headerStyle === "minimal" &&
              <HeaderMinimal {...props}/>
            }
            <section className="ood-interior-page__body">
              {props.blok.bodyTitle &&
                <header className="centered-container ood-interior-page__body-header su-text-align-center">
                  <h2 className="ood-interior-page__body-header-title su-serif">{props.blok.bodyTitle}</h2>
                </header>
              }
              <div class="centered-container flex-container">
                <aside class="ood-interior-page__body-sidebar flex-lg-4-of-12 flex-xl-3-of-12">
                  {props.blok.contentMenu && props.blok.contentMenu.map((blok) => React.createElement(Components(blok.component), {
                    key: blok._uid,
                    blok: blok
                  }))}
                </aside>
                <div class="ood-interior-page__body-content flex-lg-8-of-12">
                  {props.blok.pageContent && props.blok.pageContent.map((blok) => React.createElement(Components(blok.component), {
                    key: blok._uid,
                    blok: blok
                  }))}
                </div>
              </div>
            </section>


            <footer className="ood-interior-page__footer">
              <div className="centered-container flex-container">
                <div className="ood-interior-page__footer-wrapper flex-md-10-of-12 flex-lg-8-of-12 flex-2xl-6-of-12">
                  <div className="ood-interior-page__metadata">

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

export default OodInteriorPage