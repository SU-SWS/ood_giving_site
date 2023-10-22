import React from 'react';
import { Link } from 'gatsby';

import { useCountdown } from '../../hooks/useCountdown';

import EndowedPositionsNav from './EndowedPositionsNav';

const pieColor = '#8C1515';
const pieBackgroundColor = 'rgba(93, 75, 60, 0.1)';
const borderThickness = '20px';
const pieWidth = '180px';

const Pie = ({ children, className, descriptor, percent }) => {
  return (
    <>
      <style>
        {`.${className} {width: ${pieWidth};}`}
        {`.${className}::before {background-image: radial-gradient(farthest-side,${pieColor} 98%,#0000), conic-gradient(${pieColor} calc(${percent}*1%),${pieBackgroundColor} 0); mask: radial-gradient(farthest-side,#0000 calc(99% - ${borderThickness}),#000 calc(100% - ${borderThickness})); -webkit-mask: radial-gradient(farthest-side,#0000 calc(99% - ${borderThickness}),#000 calc(100% - ${borderThickness}))}`}
        {`.${className}::after {background: ${pieColor}; inset: calc(50% - ${borderThickness}/2); transform: rotate(calc(${percent}*3.6deg)) translateY(calc(50% - ${pieWidth}/2))}`}
      </style>
      <div className={`endowed-positions-pie ${className}`}>
        <span className="endowed-positions-pie__number">{children}</span>
        <span className="endowed-positions-pie__descriptor">{descriptor}</span>
      </div>
    </>
  );
};

const EndowedPositionsHeader = ({ to }) => {
  const targetDate = new Date('November 28, 2023').toLocaleString('en-US', {
    timeZone: 'America/Los_Angeles',
  });
  const [days, hours, minutes, seconds] = useCountdown(targetDate);
  // if (days + hours + minutes + seconds <= 0) {
  //   return <div>Countdown over!</div>;
  // }
  return (
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
                        <Link to="/endowed-positions">Endowed positions</Link>{' '}
                        are gifted by donors to support outstanding faculty,
                        staff, and campus leaders. Through these meaningful
                        investments, donors help enhance the Stanford community
                        and strengthen the university’s future.
                      </span>
                    </p>
                  </div>
                  <EndowedPositionsNav to={to} />
                  <h3>Counting to November 28, 2023</h3>
                  <div style={{ display: 'flex' }}>
                    {/* <Pie descriptor="days" percent={(days / 60) * 100}>{days}</Pie>: */}
                    <Pie
                      className="pie-hours"
                      descriptor="hours"
                      percent={(hours / 24) * 100}
                    >
                      {hours}
                    </Pie>
                    <Pie
                      className="pie-minutes"
                      descriptor="minutes"
                      percent={(minutes / 60) * 100}
                    >
                      {minutes}
                    </Pie>
                    <Pie
                      className="pie-seconds"
                      descriptor="seconds"
                      percent={(seconds / 60) * 100}
                    >
                      {seconds}
                    </Pie>
                  </div>
                </div>
              </div>
            </div>
          </header>
        </div>
      </div>
    </>
  );
};

export default EndowedPositionsHeader;
