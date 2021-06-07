import React from 'react'
import SbEditable from 'storyblok-react'
import Footer from "../partials/footer";
import IconCardSection from '../partials/iconCardSection'
import CreateBloks from "../../utilities/createBloks"
import CampaignHero from '../partials/CampaignHero';
import CampaignHeader from "../partials/campaignHeader";

const OodCampaignPage = (props) => {
  return (
    <SbEditable content={props.blok}>
      <CampaignHeader {...props} />

      <main id="main-content"
            className={`ood-campaign-page ood-campaign-page--${props.blok.headerStyle}`}
      >
        <article className={`su-bg-white`}>
          <CampaignHero {...props} />
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
