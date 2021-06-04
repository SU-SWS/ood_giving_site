import React from "react";
import CreateBloks from "../../utilities/createBloks";
import SeoSocial from "./seoSocial";

const CampaignHeader = (props) => (
  <header className="campaign-page__header">
    <CreateBloks blokSection={props.blok.alertPicker} />
    <CreateBloks blokSection={props.blok.oodCampaignHeader} />
    <SeoSocial {...props} />
  </header>
)

export default CampaignHeader;
