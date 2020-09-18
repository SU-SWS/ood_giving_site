import React from 'react'
import Link from 'gatsby-link'
import SbEditable from 'storyblok-react'
import RichTextField from '../richTextField'
import Components from "../components"
import IconCardSection from '../partials/iconCardSection'
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
          </header>
          <main id="main-content" className={`ood-landing-page__main`}>
            <article className={`su-bg-fog-light`}>
              <header className={`ood-landing-page__main-header`}>
                {props.blok.heroSection && props.blok.heroSection.map((blok) => React.createElement(Components(blok.component), {
                  key: blok._uid,
                  blok: blok
                }))}
              </header>
              {props.blok.sections && props.blok.sections.map((blok) => React.createElement(Components(blok.component), {
                key: blok._uid,
                blok: blok
              }))}
            </article>
            <IconCardSection {...props}/>
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