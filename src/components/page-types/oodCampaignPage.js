import React from 'react'
import SbEditable from 'storyblok-react'
import Footer from "../partials/footer";
import IconCardSection from '../partials/iconCardSection'
import SeoSocial from "../partials/seoSocial"
import CreateBloks from "../../utilities/createBloks"
import BelowContent from '../partials/belowContent';
import CenteredContainer from '../partials/centeredContainer';
import BodyNoSidebar from '../partials/bodyNoSidebar';
import BodyLeftSidebar from '../partials/bodyLeftSidebar';

const OodCampaignPage = (props) => {
  return (
    <SbEditable content={props.blok}>
      <SeoSocial {...props}/>
      <CreateBloks blokSection={props.blok.alertPicker} />
      <main id="main-content"
            className={`ood-campaign-page ood-campaign-page--${props.blok.headerStyle}`}
      >
        <article className={`su-bg-fog-light`}>
          {(props.blok.aboveContent != null && Object.keys(props.blok.aboveContent).length > 0) && (
            <div className="ood-interior-page__above-body">
              <CreateBloks blokSection={props.blok.aboveContent} />
            </div>
          )}
          {(props.blok.bodyTitle || (props.blok.pageContent != null && Object.keys(props.blok.pageContent).length > 0)) && (
            <section className="ood-interior-page__body">
              {props.blok.bodyTitle &&
              <header className="centered-container ood-interior-page__body-header su-text-align-left">
                <h2 className="ood-interior-page__body-header-title su-serif su-bold ood-has-tab-before">{props.blok.bodyTitle}</h2>
              </header>
              }
              <CenteredContainer flex={true} classes={`ood-interior-page__body-container`}>
                {props.blok.layout === "no-sidebar" &&
                <BodyNoSidebar {...props}/>
                }
                {props.blok.layout === "left-sidebar" &&
                <BodyLeftSidebar {...props}/>
                }
              </CenteredContainer>
            </section>
          )}
          <BelowContent {...props}/>
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
