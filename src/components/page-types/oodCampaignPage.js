import React from 'react'
import SbEditable from 'storyblok-react'
import Footer from "../partials/footer";
import IconCardSection from '../partials/iconCardSection'
import SeoSocial from "../partials/seoSocial"
import CreateBloks from "../../utilities/createBloks"
import CampaignLeftImageHero from '../partials/campaignLeftImageHero';
import CampaignFullWidthHero from '../partials/campaignFullWidthHero';

const OodCampaignPage = (props) => {
  return (
    <SbEditable content={props.blok}>
      <SeoSocial {...props}/>
      <CreateBloks blokSection={props.blok.alertPicker} />
      <main id="main-content"
            className={`ood-campaign-page ${props.blok.headerStyle ? `ood-campaign-page--${props.blok.headerStyle}` : ''}`}
      >
        <article className={`su-bg-white`}>
          {props.blok.heroStyle === "left-image" &&
            <CampaignLeftImageHero {...props}/>
          }
          {props.blok.heroStyle === "fullwidth-image" &&
            <CampaignFullWidthHero {...props}/>
          }
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
