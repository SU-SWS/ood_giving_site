import React from 'react';

import CountdownPie from './CountdownPie';
import UseCountdown from '../../hooks/useCountdown';

const Countdown = () => {
  const targetDate = new Date('November 28, 2023').toLocaleString('en-US', {
    timeZone: 'America/Los_Angeles',
  });
  const [days, hours, minutes, seconds] = UseCountdown(targetDate);

  // render nothing for now when countdown is over
  if (days + hours + minutes + seconds <= 0) {
    return null;
  }

  return (
    <div
      aria-atomic="true"
      className="countdown-wrapper"
      role="timer"
    >
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
