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
        <article className={`ood-support-page`} id="main-content">
          <header className={`ood-support-page__header`}>
            <div className={`centered-container flex-container ood-support-page__header-content`}>
              <div className={`ood-support-page__header-content-wrapper flex-md-12-of-12 flex-lg-10-of-12 flex-2xl-9-of-12
                   su-bg-${props.blok.headerBoxColor}
                   ${(props.blok.headerBoxColor !== "white" && props.blok.headerBoxColor !== "fog-light")? "su-text-white" : ""}
                   `}>
                <h1 className="ood-support-page__title">{props.blok.title}</h1>
                {props.blok.intro && (
                  <p className="su-intro-text ood-support-page__intro">{props.blok.intro}</p>
                )}
              </div>
            </div>
          </header>
          <div className="ood-support-page__content">
            {props.blok.storyContent && props.blok.storyContent.map((blok) => React.createElement(Components(blok.component), {
              key: blok._uid,
              blok: blok
            }))}
          </div>
          <footer className="ood-support-page__footer">
            <div className="centered-container flex-container">
              <div className="ood-support-page__footer-wrapper flex-md-10-of-12 flex-lg-8-of-12 flex-2xl-6-of-12">
                <div className="ood-support-page__metadata">

                </div>
              </div>
            </div>
          </footer>
        </article>
        {props.blok.iconCardSection && props.blok.iconCardSection.map((blok) => React.createElement(Components(blok.component), {
          key: blok._uid,
          blok: blok
        }))}
      </SbEditable>
    </>
  )
}

export default OodSupportPage