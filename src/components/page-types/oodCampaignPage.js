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
      <CreateBloks blokSection={props.blok.header} />
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
