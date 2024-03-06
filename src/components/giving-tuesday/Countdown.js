import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import SbEditable from 'storyblok-react';

import CountdownPie from './CountdownPie';
import UseCountdown from '../../hooks/useCountdown';

const NO_DAYS_DEFAULT_HOURS_RANGE_MAX = 36;

const getDescriptorString = (descriptor, time) => {
  return time !== 1 ? `${descriptor}s` : descriptor;
};

const convertDaysToHours = (days) => days ? days * 24 : 0;

const getHoursMaxRange = (hours) => 
  !hours ||  hours < NO_DAYS_DEFAULT_HOURS_RANGE_MAX ? NO_DAYS_DEFAULT_HOURS_RANGE_MAX : hours;

// will also need a prop for the hours ring to know what we count down to
const Countdown = ({blok}) => {
  const {date, hasDays} = blok;
  const [countdownDate, setCountdownDate] = useState(null);
  const [days, hours, minutes, seconds] = UseCountdown(countdownDate) || [];
  const displayHours = hasDays ? hours : convertDaysToHours(days) + hours;
  const hourPieRange = hasDays ? 24 : getHoursMaxRange(hours); 

  useEffect(() => {
    if (!countdownDate) {
      const dateArray = date.split(' ');
      /**
       * manually set date to 04/04/2024 7AM w/ a UTC offset (no daylight savings)
       */
      // setCountdownDate(new Date(Date.UTC(2024, 3, 4, 14, 0, 0)));
      setCountdownDate(new Date(`${dateArray[0]}T${dateArray[1]}`));
    }
  }, [countdownDate, setCountdownDate]);
// console.log('displayHours', displayHours);
// console.log('hasDays', hasDays);
console.log('date', date);
  return (
    <SbEditable content={blok}>
      {days + hours + minutes + seconds <= 0 ? (
        <div className="countdown-wrapper has-days">
          {hasDays && (
            <CountdownPie className="pie-days" descriptor="days" percent={0}>
              0
            </CountdownPie>
          )}
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
      ) : (
        <div
          aria-atomic="true"
          className={classNames('countdown-wrapper', { ['has-days']: days > 0 })}
          role="timer"
        >
          {(days > 0 && hasDays) && (
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
            descriptor={getDescriptorString('hour', displayHours)}
            percent={(displayHours / hourPieRange) * 100}
          >
            {displayHours}
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
      )}
    </SbEditable>
  );
};

export default Countdown;
