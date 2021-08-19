import React from "react";
import nextId from "react-id-generator";
import CreateBloks from "../../utilities/createBloks";
import SeoSocial from "./seoSocial";
import CampaignHero from "./campaignHero";

const CampaignHeader = (props) => {
  const htmlId = nextId("su-campaign-hero-");
  return (
    <header className="campaign-page__header">
      <CreateBloks blokSection={props.blok.alertPicker} />
      <a href={`#${htmlId}`} className="su-skiplinks">
        Skip to main content
      </a>
      <div
        className={`campaign-page__header--container campaign-page__header--${props.blok.heroStyle}`}
      >
        <CreateBloks blokSection={props.blok.oodCampaignHeader} />
        <CampaignHero {...props} htmlId={htmlId} />
      </div>
      <SeoSocial {...props} />
    </header>
  );
};

export default CampaignHeader;
