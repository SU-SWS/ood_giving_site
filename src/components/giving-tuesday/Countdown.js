import React, { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import SbEditable from 'storyblok-react';

import CountdownPie from './CountdownPie';
import UseCountdown from '../../hooks/useCountdown';

const generateClassName = (key) =>
  `${key}-${Math.floor(Math.random() * 100000, 5)}`;

const getDescriptorString = (descriptor, time) => {
  return time !== 1 ? `${descriptor}s` : descriptor;
};

const convertDaysToHours = (days) => (days ? days * 24 : 0);

const Countdown = ({ blok }) => {
  const { date, hasDays, hourPieRange, useNew } = blok;
  const [countdownDate, setCountdownDate] = useState(null);
  const [days, hours, minutes, seconds] = UseCountdown(countdownDate) || [];
  const displayHours = hasDays ? hours : convertDaysToHours(days) + hours;
  const displayHourPieRange = hasDays ? 24 : hourPieRange;
  const noTime = days + hours + minutes + seconds <= 0;
  const daysClassName = useMemo(() => generateClassName('days'), []);
  const hoursClassName = useMemo(() => generateClassName('hours'), []);
  const minutesClassName = useMemo(() => generateClassName('minutes'), []);
  const secondsClassName = useMemo(() => generateClassName('seconds'), []);

  useEffect(() => {
    if (!countdownDate) {
      if (!date) {
        if (useNew) {
          /**
           * manually set date to 04/05/2024 7PM w/ a UTC offset (no daylight savings)
           * this should only stay for the current campaign, can remove this and make
           * component purely storyblok configurable after campaign
           */
          setCountdownDate(new Date(Date.UTC(2024, 3, 6, 2, 0, 0)));
        } else {
          /**
           * manually set date to 04/04/2024 7AM w/ a UTC offset (no daylight savings)
           * this should only stay for the current campaign, can remove this and make
           * component purely storyblok configurable after campaign
           */
          setCountdownDate(new Date(Date.UTC(2024, 3, 4, 14, 0, 0)));
        }
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
      <div
        aria-atomic="true"
        className={classNames('countdown-wrapper', {
          ['has-days']: days > 0 && hasDays,
        })}
        role="timer"
      >
        {days > 0 && hasDays && (
          <CountdownPie
            className={daysClassName}
            descriptor={getDescriptorString('day', days)}
            percent={noTime ? 0 : (days / 29) * 100}
          >
            {noTime ? 0 : days}
          </CountdownPie>
        )}
        <CountdownPie
          className={hoursClassName}
          descriptor={getDescriptorString('hour', displayHours)}
          percent={noTime ? 0 : (displayHours / displayHourPieRange) * 100}
        >
          {noTime ? 0 : displayHours}
        </CountdownPie>
        <CountdownPie
          className={minutesClassName}
          descriptor={getDescriptorString('minute', minutes)}
          percent={noTime ? 0 : (minutes / 60) * 100}
        >
          {noTime ? 0 : minutes}
        </CountdownPie>
        <CountdownPie
          className={secondsClassName}
          descriptor={getDescriptorString('second', seconds)}
          percent={noTime ? 0 : (seconds / 60) * 100}
        >
          {noTime ? 0 : seconds}
        </CountdownPie>
      </div>
    </SbEditable>
  );
};

export default Countdown;
