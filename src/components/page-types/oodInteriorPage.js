import React from 'react'
import SbEditable from 'storyblok-react'
import HeaderMinimal from '../partials/headerMinimal'
import HeaderNoImage from '../partials/headerNoImage'
import HeaderWithImage from '../partials/headerWithImage'
import BodyLeftSidebar from '../partials/bodyLeftSidebar'
import BodyNoSidebar from '../partials/bodyNoSidebar'
import BelowContent from '../partials/belowContent'
import IconCardSection from '../partials/iconCardSection'
import Footer from '../partials/footer'
import SeoSocial from '../partials/seoSocial'
import CreateBloks from "../../utilities/createBloks"
import CenteredContainer from "../partials/centeredContainer"

const OodInteriorPage = (props) => {
  return (
      <SbEditable content={props.blok}>
        <SeoSocial {...props}/>
        <CreateBloks blokSection={props.blok.alertPicker} />
        <CreateBloks blokSection={props.blok.localHeader} />
        <main id="main-content"
              className={`ood-interior-page ood-interior-page--${props.blok.headerStyle}`}
        >
          <article className={`su-bg-fog-light`}>
            {props.blok.headerStyle === "has-image" &&
              <HeaderWithImage {...props}/>
            }
            {props.blok.headerStyle === "no-image" &&
              <HeaderNoImage {...props}/>
            }
            {props.blok.headerStyle === "minimal" &&
              <HeaderMinimal {...props}/>
            }
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
            <footer className="ood-interior-page__main-footer">
              <IconCardSection {...props}/>
            </footer>
          </article>
        </main>
        <Footer {...props}/>
      </SbEditable>
  )
};

export default OodInteriorPage
