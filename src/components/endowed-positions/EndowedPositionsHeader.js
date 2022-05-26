import React from 'react';

import EndowedPositionsNav from './EndowedPositionsNav';

const EndowedPositionsHeader = ({to}) => (
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
                    <p><span>Endowed positions are gifted by donors to support outstanding faculty in perpetuity. This directory of all endowed positions at Stanford is updated six times per year, following meetings of Stanford's Board of Trustees.</span></p>
                </div>
                <EndowedPositionsNav to={to} />
              </div>
            </div>
          </div>
        </header>
      </div>
    </div>
  </>
);

export default EndowedPositionsHeader;
