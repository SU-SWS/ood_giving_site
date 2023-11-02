import React from 'react';
import classNames from 'classnames';

import CountdownPie from './CountdownPie';
import UseCountdown from '../../hooks/useCountdown';

const Countdown = () => {
  /**
   * manually set date to 11/28/2023 w/ a UTC offset (no daylight savings)
   */
  const targetDate = new Date(Date.UTC(2023, 10, 29, 7, 59, 59));
  const [days, hours, minutes, seconds] = UseCountdown(targetDate);

  // render nothing for now when countdown is over
  if (days + hours + minutes + seconds <= 0) {
    return null;
  }

  return (
    <div
      aria-atomic="true"
      className={classNames('countdown-wrapper', { ['has-days']: days > 0 })}
      role="timer"
    >
      {days > 0 && (
        <CountdownPie
          className="pie-days"
          descriptor="days"
          percent={(days / 29) * 100}
        >
          {days}
        </CountdownPie>
      )}
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
  );
};

export default Countdown;
