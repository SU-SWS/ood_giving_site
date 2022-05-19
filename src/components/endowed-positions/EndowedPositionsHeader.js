import React from 'react';

import EndowedPositionsNav from './EndowedPositionsNav';

const EndowedPositionsHeader = () => (
  <>
    <div className="ood-interior-page--no-image ood-support-page">
      <div className="su-bg-fog-light">
        <header className="ood-interior-page__header ood-interior-page__header--no-image">
          <div className="ood-interior-page__header-title-wrapper su-bg-palo-verde-dark">
            <div className="centered-container flex-container">
                <h1 className="ood-interior-page__title flex-xl-10-of-12 su-serif su-text-white">
                  Professorships and Other Endowed Positions
                </h1>
            </div>
          </div>
          <div className="centered-container flex-container ood-interior-page__header-intro">
            <div className="ood-interior-page__header-intro-wrapper flex-12-of-12 su-bg-white">
              <div className="intro-text ood-interior-page__intro flex-xl-10-of-12">
                <div>
                    <p><span>This site is a comprehensive directory of endowed positions at Stanford. It is updated six times per year, following meetings of Stanford's Board of Trustees.</span></p>
                </div>
                <EndowedPositionsNav />
              </div>
            </div>
          </div>
        </header>
      </div>
    </div>
  </>
);

export default EndowedPositionsHeader;