import React from 'react'
import SbEditable from 'storyblok-react'
import Footer from "../partials/footer";
import IconCardSection from '../partials/iconCardSection'
import SeoSocial from "../partials/seoSocial"
import CreateBloks from "../../utilities/createBloks"

const OodLandingPage = (props) => {
  return (
    <SbEditable content={props.blok}>
      <SeoSocial {...props}/>
      <div className={`ood-landing-page su-bg-fog-light`}>
        <CreateBloks blokSection={props.blok.localHeader} />
        <main id="main-content" className={`ood-landing-page__main`}>
          <article className={`su-bg-fog-light`}>
            <header className={`ood-landing-page__main-header`}>
              <CreateBloks blokSection={props.blok.heroSection} />
            </header>
            <section className="ood-landing-page__main-body">
              <CreateBloks blokSection={props.blok.sections} />
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
