import React from 'react';

import CountdownPie from './CountdownPie';
import UseCountdown from '../../hooks/useCountdown';

const Countdown = () => {
  const targetDate = new Date('November 28, 2023').toLocaleString('en-US', {
    timeZone: 'America/Los_Angeles',
  });
  const [days, hours, minutes, seconds] = UseCountdown(targetDate);

  return (
    <div className="countdown-wrapper">
      {/* <CountdownPie descriptor="days" percent={(days / 60) * 100}>{days}</CountdownPie>: */}
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