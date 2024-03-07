import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import SbEditable from 'storyblok-react';

import CountdownPie from './CountdownPie';
import UseCountdown from '../../hooks/useCountdown';

const getDescriptorString = (descriptor, time) => {
  return time !== 1 ? `${descriptor}s` : descriptor;
};

const convertDaysToHours = (days) => (days ? days * 24 : 0);

const Countdown = ({ blok }) => {
  const { date, hasDays, hourPieRange } = blok;
  const [countdownDate, setCountdownDate] = useState(null);
  const [days, hours, minutes, seconds] = UseCountdown(countdownDate) || [];
  const displayHours = hasDays ? hours : convertDaysToHours(days) + hours;
  const displayHourPieRange = hasDays ? 24 : hourPieRange;

  useEffect(() => {
    if (!countdownDate) {
      if (!date) {
        /**
         * manually set date to 04/04/2024 7AM w/ a UTC offset (no daylight savings)
         * this should only stay for the current campaign, can remove this and make
         * component purely storyblok configurable after campaign
         */
        setCountdownDate(new Date(Date.UTC(2024, 3, 4, 14, 0, 0)));
      } else {
        /**
         * the date prop returns in the following format: "2023-11-21 23:56"
         * we have convert it to be usable for the js Date object
         */
        const dateArray = date.split(' ');

        setCountdownDate(new Date(`${dateArray[0]}T${dateArray[1]}`));
      }
    }
  }, [countdownDate, setCountdownDate]);

  return (
    <SbEditable content={blok}>
      {days + hours + minutes + seconds <= 0 ? (
        <div
          className={classNames('countdown-wrapper', {
            ['has-days']: days > 0,
          })}
        >
          {days > 0 && hasDays && (
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
          <CountdownPie
            className="pie-seconds"
            descriptor="seconds"
            percent={0}
          >
            0
          </CountdownPie>
        </div>
      ) : (
        <div
          aria-atomic="true"
          className={classNames('countdown-wrapper', {
            ['has-days']: days > 0,
          })}
          role="timer"
        >
          {days > 0 && hasDays && (
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
            percent={(displayHours / displayHourPieRange) * 100}
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
