import React from 'react'
import Link from 'gatsby-link'
import SbEditable from 'storyblok-react'
import RichTextField from '../richTextField'
import Components from "../components"
import { Helmet } from 'react-helmet';

const OodInteriorPage = (props) => {

  return (
    <>
      <Helmet><title>{`${props.blok.title} | Giving to Stanford`}</title></Helmet>
      <SbEditable content={props.blok}>
        {props.blok.localHeader && props.blok.localHeader.map((blok) => React.createElement(Components(blok.component), {
          key: blok._uid,
          blok: blok
        }))}
        <main id="main-content">
          <article className={`ood-interior-page su-bg-fog-light`}>
            <header className={`ood-interior-page__header`}>
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
            <section className="ood-interior-page__body">
              <header className="centered-container ood-interior-page__body-header su-text-align-center">
                <h2 className="ood-interior-page__body-header-title su-serif">{props.blok.bodyTitle}</h2>
              </header>
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