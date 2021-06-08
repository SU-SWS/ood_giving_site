import React from "react";
import CreateBloks from "../../utilities/createBloks";
import SeoSocial from "./seoSocial";
import CampaignHero from "./campaignHero";

const CampaignHeader = (props) => {
  return (
    <header className="campaign-page__header">
      <CreateBloks blokSection={props.blok.alertPicker} />
      <div className={`campaign-page__header--container campaign-page__header--${props.blok.heroStyle}`}>
        <CreateBloks blokSection={props.blok.oodCampaignHeader} />
        <CampaignHero {...props} />
      </div>
      <SeoSocial {...props} />
    </header>
  )
}

export default CampaignHeader;
