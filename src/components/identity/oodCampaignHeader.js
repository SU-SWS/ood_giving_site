import React from "react";
import SbEditable from "storyblok-react";
import CreateBloks from "../../utilities/createBloks";
import FullWidthImage from "../media/fullWidthImage";
import SbLink from "../partials/sbLink";

const OodCampaignHeader = (props) => {
  return (
    <SbEditable content={props.blok}>
      <div className={`campaign-page__header-inner ${props.blok.headerColor}`}>
        <div className="flex-container centered-container su-align-items-center su-justify-content">
          {props.blok?.logoImage?.filename ? (
            <div className="logo-image">
              <SbLink link={props.blok.logoLink}>
                <FullWidthImage
                  filename={props.blok.logoImage.filename}
                  blok={props.blok}
                />
              </SbLink>
            </div>
          ) : (
            <CreateBloks blokSection={props.blok.lockup} />
          )}
          <CreateBloks blokSection={props.blok.lockup} />
          {!props.blok.hideHomeLink && (
            <SbLink
              link={props.blok.homeLink}
              classes={`campaign-page__header-icon ${props.blok.headerColor}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="home-icon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Home
            </SbLink>
          )}
        </div>
      </div>
    </SbEditable>
  );
};

export default OodCampaignHeader;
