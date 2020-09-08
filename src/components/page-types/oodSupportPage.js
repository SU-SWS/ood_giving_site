import React from 'react'
import Link from 'gatsby-link'
import SbEditable from 'storyblok-react'
import RichTextField from '../richTextField'
import Components from "../components"
import { Helmet } from 'react-helmet';

const OodSupportPage = (props) => {

  return (
    <>
      <Helmet><title>{`${props.blok.title} | Giving to Stanford`}</title></Helmet>
      <SbEditable content={props.blok}>
        <main id="main-content">
          <article className={`ood-support-page`}>
            <header className={`ood-support-page__header su-pt-7 su-bg-${props.blok.headerBackgroundColor}`}>
              <div className={`centered-container flex-container ood-support-page__header-content`}>
                <h1 className="ood-support-page__title flex-12-of-12 su-text-white su-text-align-center">{props.blok.title}</h1>
                <div className={`ood-support-page__header-content-wrapper flex-12-of-12
                     su-bg-white su-text-align-center`}>
                  {props.blok.intro && (
                    <p className="su-intro-text ood-support-page__intro">{props.blok.intro}</p>
                  )}
                </div>
              </div>
            </header>
            <section className="ood-support-page__body">
              <header className="centered-container ood-support-page__body-header su-text-align-center">
                <h2 className="ood-support-page__body-header-title su-serif">{props.blok.cardSectionTitle}</h2>
              </header>
              <div class="centered-container ood-support-page__filter-container">
                <input type="radio" id="athletics" name="area"/>
                <label htmlFor="athletics">Athletics</label>
                <input type="radio" id="undergraduate" name="area"/>
                <label htmlFor="undergraduate">Undergraduate Education</label>
                <input type="radio" id="grad" name="area"/>
                <label htmlFor="grad">Graduate Education</label>
                <input type="radio" id="arts" name="area"/>
                <label htmlFor="arts">Arts</label>
                <div className={`grid-3-column su-my-7`}>
                  {props.blok.undergraduate && props.blok.undergraduate.map((blok) => React.createElement(Components(blok.component), {
                    key: blok._uid,
                    blok: blok
                  }))}
                  {props.blok.graduate && props.blok.graduate.map((blok) => React.createElement(Components(blok.component), {
                    key: blok._uid,
                    blok: blok
                  }))}
                  {props.blok.arts && props.blok.arts.map((blok) => React.createElement(Components(blok.component), {
                    key: blok._uid,
                    blok: blok
                  }))}
                  {props.blok.athletics && props.blok.athletics.map((blok) => React.createElement(Components(blok.component), {
                    key: blok._uid,
                    blok: blok
                  }))}
                </div>
              </div>
            </section>
            <footer className="ood-support-page__footer">
              <div className="centered-container flex-container">
                <div className="ood-support-page__footer-wrapper flex-md-10-of-12 flex-lg-8-of-12 flex-2xl-6-of-12">
                  <div className="ood-support-page__metadata">

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
        {props.blok.globalFooter && props.blok.globalFooter.map((blok) => React.createElement(Components(blok.component), {
          key: blok._uid,
          blok: blok
        }))}
      </SbEditable>
    </>
  )
}

export default OodSupportPage