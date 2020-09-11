import React from 'react'
import Link from 'gatsby-link'
import SbEditable from 'storyblok-react'
import RichTextField from '../richTextField'
import Components from "../components"
import { Helmet } from 'react-helmet';

const OodLandingPage = (props) => {

  return (
    <>
      <Helmet><title>{`${props.blok.title} | Giving to Stanford`}</title></Helmet>
      <SbEditable content={props.blok}>
        <div className={`ood-landing-page su-bg-fog-light`}>
          <header className={`ood-landing-page__header`}>
            {props.blok.localHeader && props.blok.localHeader.map((blok) => React.createElement(Components(blok.component), {
              key: blok._uid,
              blok: blok
            }))}
            {props.blok.heroSection && props.blok.heroSection.map((blok) => React.createElement(Components(blok.component), {
              key: blok._uid,
              blok: blok
            }))}
          </header>
          <main id="main-content" className={`ood-landing-page__main`}>
            <article className={`su-bg-fog-light`}>
              <header className={`ood-landing-page__main-header`}>
                <div className={`ood-landing-page__header-title-wrapper su-pt-7 su-bg-${props.blok.headerBackgroundColor}`}>
                  <div className={`centered-container`}>
                    <h1 className="ood-landing-page__title flex-xl-10-of-12 su-serif su-text-white su-text-align-center">{props.blok.title}</h1>
                  </div>
                </div>
                <div className={`centered-container flex-container ood-landing-page__main-header-content`}>
                  <div className={`ood-landing-page__main-header-content-wrapper flex-12-of-12
                       su-bg-white su-text-align-center`}>
                    {props.blok.intro && (
                      <p className="su-intro-text ood-landing-page__intro flex-xl-10-of-12">{props.blok.intro}</p>
                    )}
                  </div>
                </div>
              </header>
              {props.blok.sections && props.blok.sections.map((blok) => React.createElement(Components(blok.component), {
                key: blok._uid,
                blok: blok
              }))}
            </article>
            {props.blok.iconCardSection && props.blok.iconCardSection.map((blok) => React.createElement(Components(blok.component), {
              key: blok._uid,
              blok: blok
            }))}
          </main>
          <footer>
            {props.blok.localFooter && props.blok.localFooter.map((blok) => React.createElement(Components(blok.component), {
              key: blok._uid,
              blok: blok
            }))}
            {props.blok.globalFooter && props.blok.globalFooter.map((blok) => React.createElement(Components(blok.component), {
              key: blok._uid,
              blok: blok
            }))}
          </footer>
        </div>
      </SbEditable>
    </>
  )
}

export default OodLandingPage