import React from 'react'
import SbEditable from 'storyblok-react'
import HeaderNoImage from '../partials/headerNoImage'
import Footer from "../partials/footer"
import BelowContent from '../partials/belowContent'
import IconCardSection from '../partials/iconCardSection'
import SeoSocial from "../partials/seoSocial"
import CreateBloks from "../../utilities/createBloks"
import CenteredContainer from "../partials/centeredContainer"

const OodSupportPage = (props) => {
  return (
    <>
      <SbEditable content={props.blok}>
        <SeoSocial {...props}/>
        <CreateBloks blokSection={props.blok.localHeader} />
        <main id="main-content"
              className="ood-interior-page--no-image ood-support-page"
        >
          <article className={`su-bg-fog-light`}>
            <HeaderNoImage {...props}/>
            <section className="ood-interior-page__body ood-support-page__body">
              {props.blok.bodyTitle &&
                <header className="centered-container ood-interior-page__body-header su-text-align-left">
                  <h2 className="ood-interior-page__body-header-title su-serif su-bold ood-has-tab-before">{props.blok.bodyTitle}</h2>
                </header>
              }
              <p className={`su-sr-only-element`}>Click the radio buttons to choose the areas you would like to support. A different list of links will be displayed for each radio button selected.</p>
              <CenteredContainer classes={"ood-support-page__filter-container"}>
                <input type="radio" id="all" name="areas-to-support" defaultChecked />
                <label htmlFor="all">All</label>
                <input type="radio" id="undergraduate" name="areas-to-support"/>
                <label htmlFor="undergraduate">Undergraduate Education</label>
                <input type="radio" id="grad" name="areas-to-support"/>
                <label htmlFor="grad">Graduate Education</label>
                <input type="radio" id="arts" name="areas-to-support"/>
                <label htmlFor="arts">Arts + Humanities</label>
                <input type="radio" id="athletics" name="areas-to-support"/>
                <label htmlFor="athletics">Athletics</label>
                <input type="radio" id="business" name="areas-to-support"/>
                <label htmlFor="business">Business + Economics</label>
                <input type="radio" id="culture" name="areas-to-support"/>
                <label htmlFor="culture">Culture + Ethics</label>
                <input type="radio" id="law" name="areas-to-support"/>
                <label htmlFor="law">Law, Policy, + Government</label>
                <input type="radio" id="medicine" name="areas-to-support"/>
                <label htmlFor="medicine">Medicine + Health Care</label>
                <input type="radio" id="science" name="areas-to-support"/>
                <label htmlFor="science">Science + Technology</label>
                <input type="radio" id="sustainability" name="areas-to-support"/>
                <label htmlFor="sustainability">Sustainability</label>
                <input type="radio" id="teaching" name="areas-to-support"/>
                <label htmlFor="teaching">Teaching + Learning</label>
                <div className={`grid-3-column su-mt-6 su-mb-4`}>
                  <CreateBloks blokSection={props.blok.undergraduate} />
                  <CreateBloks blokSection={props.blok.graduate} />
                  <CreateBloks blokSection={props.blok.arts} />
                  <CreateBloks blokSection={props.blok.athletics} />
                  <CreateBloks blokSection={props.blok.business} />
                  <CreateBloks blokSection={props.blok.culture} />
                  <CreateBloks blokSection={props.blok.law} />
                  <CreateBloks blokSection={props.blok.medicine} />
                  <CreateBloks blokSection={props.blok.science} />
                  <CreateBloks blokSection={props.blok.sustainability} />
                  <CreateBloks blokSection={props.blok.teaching} />
                </div>
              </CenteredContainer>
            </section>
            <BelowContent {...props}/>
            <footer className="ood-support-page__main-footer">
              <IconCardSection {...props}/>
            </footer>
          </article>
        </main>
        <Footer {...props}/>
      </SbEditable>
    </>
  )
};

export default OodSupportPage
