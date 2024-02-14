import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import CountdownPie from './CountdownPie';
import UseCountdown from '../../hooks/useCountdown';

const getDescriptorString = (descriptor, time) => {
  return time !== 1 ? `${descriptor}s` : descriptor;
};

const Countdown = () => {
  const [countdownDate, setCountdownDate] = useState(null);
  const [days, hours, minutes, seconds] = UseCountdown(countdownDate) || [];

  useEffect(() => {
    if (!countdownDate) {
      /**
       * manually set date to 04/04/2024 7AM w/ a UTC offset (no daylight savings)
       */
      setCountdownDate(new Date(Date.UTC(2024, 3, 4, 14, 0, 0)));
    }
  }, [countdownDate, setCountdownDate]);

  if (days + hours + minutes + seconds <= 0) {
    return (
      <div className="countdown-wrapper has-days">
        <CountdownPie className="pie-days" descriptor="days" percent={0}>
          0
        </CountdownPie>
        <CountdownPie clasName="pie-hours" descriptor="hours" percent={0}>
          0
        </CountdownPie>
        <CountdownPie clasName="pie-minutes" descriptor="minutes" percent={0}>
          0
        </CountdownPie>
        <CountdownPie className="pie-seconds" descriptor="seconds" percent={0}>
          0
        </CountdownPie>
      </div>
    );
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
          descriptor={getDescriptorString('day', days)}
          percent={(days / 29) * 100}
        >
          {days}
        </CountdownPie>
      )}
      <CountdownPie
        className="pie-hours"
        descriptor={getDescriptorString('hour', hours)}
        percent={(hours / 24) * 100}
      >
        {hours}
      </CountdownPie>
      <CountdownPie
        className="pie-minutes"
        descriptor={getDescriptorString('minute', minutes)}
        percent={(minutes / 60) * 100}
      >
        {minutes}
      </CountdownPie>
      <CountdownPie
        className="pie-seconds"
        descriptor={getDescriptorString('second', seconds)}
        percent={(seconds / 60) * 100}
      >
        {seconds}
      </CountdownPie>
    </div>
  );
};

export default Countdown;
