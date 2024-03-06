import React from 'react';
import { Link } from 'gatsby';

import EndowedPositionsNav from './EndowedPositionsNav';
import Countdown from '../giving-tuesday/Countdown';

const EndowedPositionsHeader = ({ to }) => (
  <>
    <div className="ood-interior-page--no-image ood-support-page">
      <div className="su-bg-fog-light">
        <header className="ood-interior-page__header ood-interior-page__header--no-image">
          <div className="ood-interior-page__header-title-wrapper su-bg-palo-verde-dark">
            <div className="centered-container flex-container">
              <h1 className="ood-interior-page__title flex-xl-10-of-12 su-serif su-text-white">
                Endowed Positions at Stanford
              </h1>
            </div>
          </div>
          <div className="centered-container flex-container ood-interior-page__header-intro">
            <div className="ood-interior-page__header-intro-wrapper flex-12-of-12 su-bg-white">
              <div className="endowed-positions-header intro-text ood-interior-page__intro flex-xl-10-of-12">
                <div>
                  <p>
                    <span>
                      <Link to="/endowed-positions">Endowed positions</Link> are
                      gifted by donors to support outstanding faculty, staff,
                      and campus leaders. Through these meaningful investments,
                      donors help enhance the Stanford community and strengthen
                      the university’s future.
                    </span>
                  </p>
                </div>
                <Countdown hasDays={false} />
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
