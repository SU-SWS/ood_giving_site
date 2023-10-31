import React from 'react';

import CountdownPie from './CountdownPie';
import UseCountdown from '../../hooks/useCountdown';

const Countdown = () => {
  /**
   * manually set date to 11/28/2023 w/ a UTC offset (no daylight savings)
   */
  const targetDate = new Date(Date.UTC(2023, 10, 28, 8));
  const [days, hours, minutes, seconds] = UseCountdown(targetDate);

  // render nothing for now when countdown is over
  if (days + hours + minutes + seconds <= 0) {
    return null;
  }

  return (
    <div aria-atomic="true" className="countdown-wrapper" role="timer">
      <div className="countdown-pie-row">
        <div className="countdown-spacer" />
        <CountdownPie
          className="pie-days"
          descriptor="days"
          percent={(days / 29) * 100}
        >
          {days}
        </CountdownPie>
        <div className="countdown-spacer" />
      </div>
      <div className="countdown-pie-row">
        <CountdownPie
          className="pie-hours"
          descriptor="hours"
          percent={(hours / 24) * 100}
        >
          {hours}
        </CountdownPie>
        <CountdownPie
          className="pie-minutes"
          descriptor="minutes"
          percent={(minutes / 60) * 100}
        >
          {minutes}
        </CountdownPie>
        <CountdownPie
          className="pie-seconds"
          descriptor="seconds"
          percent={(seconds / 60) * 100}
        >
          {seconds}
        </CountdownPie>
      </div>
    </div>
  );
};

export default Countdown;
