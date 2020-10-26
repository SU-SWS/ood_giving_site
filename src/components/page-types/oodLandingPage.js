import React from 'react'
import SbEditable from 'storyblok-react'
import Components from "../components"
import Footer from "../partials/footer";
import IconCardSection from '../partials/iconCardSection'
import SeoSocial from "../partials/seoSocial"


const OodLandingPage = (props) => {
  return (
    <SbEditable content={props.blok}>
      <SeoSocial {...props}/>
      <div className={`ood-landing-page su-bg-fog-light`}>
        {props.blok.localHeader && props.blok.localHeader.map((blok) => React.createElement(Components(blok.component), {
          key: blok._uid,
          blok: blok
        }))}
        <main id="main-content" className={`ood-landing-page__main`}>
          <article className={`su-bg-fog-light`}>
            <header className={`ood-landing-page__main-header`}>
              {props.blok.heroSection && props.blok.heroSection.map((blok) => React.createElement(Components(blok.component), {
                key: blok._uid,
                blok: blok
              }))}
            </header>
            <section className="ood-landing-page__main-body">
              {props.blok.sections && props.blok.sections.map((blok) => React.createElement(Components(blok.component), {
                key: blok._uid,
                blok: blok
              }))}
            </section>
          </article>
          <footer className="ood-landing-page__main-footer">
            <IconCardSection {...props}/>
          </footer>
        </main>
        <Footer {...props}/>
      </div>
    </SbEditable>
  )
};

export default OodLandingPage
