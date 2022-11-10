import React, { useEffect } from 'react';
import SbEditable from 'storyblok-react';
import HeaderNoImage from '../partials/headerNoImage';
import Footer from '../partials/footer';
import BelowContent from '../partials/belowContent';
import IconCardSection from '../partials/iconCardSection';
import SeoSocial from '../partials/seoSocial';
import CreateBloks from '../../utilities/createBloks';
import CenteredContainer from '../partials/centeredContainer';
import Heading from '../partials/heading';
import { navigate } from 'gatsby';

const OodSupportPage = (props) => {
  /**
   * Sets filter state from URL fragment.
   */
  const setActiveFilter = () => {
    const activeId = window.location.hash.substr(1);
    // Simulate click to set the initial filter state.
    const filterButton = document.getElementById(activeId);
    if (filterButton) {
      filterButton.click();
    }
  };

  useEffect(() => {
    // Set the initial filter state from URL fragment.
    if (window.location.hash) {
      setActiveFilter();
    }

    // Event listener used for 'back button' nagivation.
    window.addEventListener('hashchange', setActiveFilter);
  }, []); // Empty array ensures this effect is only called once on page load.

  return (
    <>
      <SbEditable content={props.blok}>
        <SeoSocial {...props} />
        <CreateBloks blokSection={props.blok.alertPicker} />
        <CreateBloks blokSection={props.blok.localHeader} />
        <main
          id="main-content"
          className="ood-interior-page--no-image ood-support-page"
        >
          <article className={`su-bg-fog-light`}>
            <HeaderNoImage {...props} />
            <section className="ood-interior-page__body ood-support-page__body">
              {props.blok.bodyTitle && (
                <header className="centered-container ood-interior-page__body-header su-text-align-left">
                  <Heading
                    level={'h2'}
                    weight={'bold'}
                    serif={true}
                    classes="ood-interior-page__body-header-title ood-has-tab-before"
                  >
                    {props.blok.bodyTitle}
                  </Heading>
                </header>
              )}
              <p className={`su-sr-only-element`}>{props.blok.srText}</p>
              <CenteredContainer classes={'ood-support-page__filter-container'}>
                <input
                  type="radio"
                  id="undergraduate"
                  name="areas-to-support"
                  onClick={updateHash}
                  defaultChecked
                />
                <label htmlFor="undergraduate">Undergraduate Education</label>
                <input
                  type="radio"
                  id="grad"
                  name="areas-to-support"
                  onClick={updateHash}
                />
                <label htmlFor="grad">Graduate Education</label>
                <input
                  type="radio"
                  id="arts"
                  name="areas-to-support"
                  onClick={updateHash}
                />
                <label htmlFor="arts">Arts + Humanities</label>
                <input
                  type="radio"
                  id="athletics"
                  name="areas-to-support"
                  onClick={updateHash}
                />
                <label htmlFor="athletics">Athletics</label>
                <input
                  type="radio"
                  id="business"
                  name="areas-to-support"
                  onClick={updateHash}
                />
                <label htmlFor="business">Business + Economics</label>
                <input
                  type="radio"
                  id="culture"
                  name="areas-to-support"
                  onClick={updateHash}
                />
                <label htmlFor="culture">Culture, Ethics, + Service</label>
                <input
                  type="radio"
                  id="ideal"
                  name="areas-to-support"
                  onClick={updateHash}
                />
                <label htmlFor="ideal">IDEAL</label>
                <input
                  type="radio"
                  id="law"
                  name="areas-to-support"
                  onClick={updateHash}
                />
                <label htmlFor="law">Law, Policy, + Government</label>
                <input
                  type="radio"
                  id="medicine"
                  name="areas-to-support"
                  onClick={updateHash}
                />
                <label htmlFor="medicine">Medicine + Health Care</label>
                <input
                  type="radio"
                  id="science"
                  name="areas-to-support"
                  onClick={updateHash}
                />
                <label htmlFor="science">Science + Technology</label>
                <input
                  type="radio"
                  id="sustainability"
                  name="areas-to-support"
                  onClick={updateHash}
                />
                <label htmlFor="sustainability">Sustainability</label>
                <input
                  type="radio"
                  id="teaching"
                  name="areas-to-support"
                  onClick={updateHash}
                />
                <label htmlFor="teaching">Teaching + Learning</label>
                <input
                  type="radio"
                  id="all"
                  name="areas-to-support"
                  onClick={updateHash}
                />
                <label htmlFor="all">All</label>
                <div className={`grid-3-column su-mt-2 su-mb-4`}>
                  <CreateBloks blokSection={props.blok.undergraduate} />
                  <CreateBloks blokSection={props.blok.graduate} />
                  <CreateBloks blokSection={props.blok.arts} />
                  <CreateBloks blokSection={props.blok.athletics} />
                  <CreateBloks blokSection={props.blok.business} />
                  <CreateBloks blokSection={props.blok.culture} />
                  <CreateBloks blokSection={props.blok.ideal} />
                  <CreateBloks blokSection={props.blok.law} />
                  <CreateBloks blokSection={props.blok.medicine} />
                  <CreateBloks blokSection={props.blok.science} />
                  <CreateBloks blokSection={props.blok.sustainability} />
                  <CreateBloks blokSection={props.blok.teaching} />
                </div>
              </CenteredContainer>
            </section>
            <BelowContent {...props} />
            <footer className="ood-support-page__main-footer">
              <IconCardSection {...props} />
            </footer>
          </article>
        </main>
        <Footer {...props} />
      </SbEditable>
    </>
  );
};

/**
 * Update the page url hash through gatsby's navigate.
 *
 * @param {object} e
 *   Browser event object.
 *
 **/
function updateHash(e) {
  navigate(`#${e.target.id}`);
}

export default OodSupportPage;
