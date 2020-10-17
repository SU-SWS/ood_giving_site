import React from 'react'
import SbEditable from 'storyblok-react'
import RichTextField from '../../utilities/richTextField'
import Components from "../components"
import HeaderNoImage from '../partials/headerNoImage'
import Footer from "../partials/footer"
import BelowContent from '../partials/belowContent'
import IconCardSection from '../partials/iconCardSection'
import { Helmet } from 'react-helmet'

const OodSupportPage = (props) => {
  return (
    <>
      <SbEditable content={props.blok}>
        <Helmet><title>{`${props.blok.title} | Giving to Stanford`}</title></Helmet>
        {props.blok.localHeader && props.blok.localHeader.map((blok) => React.createElement(Components(blok.component), {
          key: blok._uid,
          blok: blok
        }))}
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
              <div className="centered-container ood-support-page__filter-container">
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
                <label htmlFor="medicine">Medicine + Healthcare</label>
                <input type="radio" id="science" name="areas-to-support"/>
                <label htmlFor="science">Science + Technology</label>
                <input type="radio" id="sustainability" name="areas-to-support"/>
                <label htmlFor="sustainability">Sustainability</label>
                <div className={`grid-3-column su-mt-6 su-mb-4`}>
                  {props.blok.graduate && props.blok.graduate.map((blok) => React.createElement(Components(blok.component), {
                    key: blok._uid,
                    blok: blok
                  }))}
                  {props.blok.undergraduate && props.blok.undergraduate.map((blok) => React.createElement(Components(blok.component), {
                    key: blok._uid,
                    blok: blok
                  }))}
                  {props.blok.arts && props.blok.arts.map((blok) => React.createElement(Components(blok.component), {
                    key: blok._uid,
                    blok: blok
                  }))}
                  {props.blok.athletics && props.blok.athletics.map((blok) => React.createElement(Components(blok.component), {
                    key: blok._uid,
                    blok: blok
                  }))}
                  {props.blok.business && props.blok.business.map((blok) => React.createElement(Components(blok.component), {
                    key: blok._uid,
                    blok: blok
                  }))}
                  {props.blok.culture && props.blok.culture.map((blok) => React.createElement(Components(blok.component), {
                    key: blok._uid,
                    blok: blok
                  }))}
                  {props.blok.law && props.blok.law.map((blok) => React.createElement(Components(blok.component), {
                    key: blok._uid,
                    blok: blok
                  }))}
                  {props.blok.medicine && props.blok.medicine.map((blok) => React.createElement(Components(blok.component), {
                    key: blok._uid,
                    blok: blok
                  }))}
                  {props.blok.science && props.blok.science.map((blok) => React.createElement(Components(blok.component), {
                    key: blok._uid,
                    blok: blok
                  }))}
                  {props.blok.sustainability && props.blok.sustainability.map((blok) => React.createElement(Components(blok.component), {
                    key: blok._uid,
                    blok: blok
                  }))}
                </div>
              </div>
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
