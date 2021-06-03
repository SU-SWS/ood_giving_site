import React from 'react'
import SbEditable from 'storyblok-react'
import Footer from "../partials/footer";
import IconCardSection from '../partials/iconCardSection'
import SeoSocial from "../partials/seoSocial"
import CreateBloks from "../../utilities/createBloks"
import CampaignHeroHeader from '../partials/campaignHeroHeader';
import SbLink from "../partials/sbLink";

const OodCampaignPage = (props) => {
  return (
    <SbEditable content={props.blok}>
      <header className={`campaign-page__header-lockup ${props.blok.headerColor}`}>
        <a href="#main-content" className="su-skiplinks">
          Skip to main content
        </a>

        <div className="flex-container centered-container su-align-items-baseline su-justify-content">
          <CreateBloks blokSection={props.blok.lockup} />

          <SbLink link={props.blok.homeLink} classes={`campaign-page__header-icon ${props.blok.headerColor}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="home-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>

            Home
          </SbLink>
        </div>

        <SeoSocial {...props}/>
        <CreateBloks blokSection={props.blok.alertPicker} />
      </header>
      <main id="main-content"
            className={`ood-campaign-page ood-campaign-page--${props.blok.headerStyle}`}
      >
        <article className={`su-bg-white`}>
          <CampaignHeroHeader {...props} />
          <section className="ood-campaign-page__main-body">
            <CreateBloks blokSection={props.blok.content} />
          </section>
          <footer className="ood-campaign-page__main-footer">
            <IconCardSection {...props}/>
          </footer>
        </article>
      </main>
      <Footer {...props}/>
    </SbEditable>
  )
};

export default OodCampaignPage
