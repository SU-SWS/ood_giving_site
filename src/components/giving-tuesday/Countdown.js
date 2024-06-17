import React, { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import SbEditable from 'storyblok-react';

import CountdownPie from './CountdownPie';
import UseCountdown from '../../hooks/useCountdown';

// use useId when it becomes available
const generateClassName = (key) =>
  `${key}-${Math.floor(Math.random() * 100000, 5)}`;

const getDescriptorString = (descriptor, time) => {
  return time !== 1 ? `${descriptor}s` : descriptor;
};

const convertDaysToHours = (days) => (days ? days * 24 : 0);

const Countdown = ({ blok }) => {
  const { date, dayPieRange, hasDays, hourPieRange, isDST } = blok;
  const [countdownDate, setCountdownDate] = useState(null);
  const [days, hours, minutes, seconds] = UseCountdown(countdownDate) || [];
  const displayHours = hasDays ? hours : convertDaysToHours(days) + hours;
  const displayHourPieRange = hasDays ? 24 : hourPieRange;
  const noTime = days + hours + minutes + seconds <= 0;
  const daysClassName = useMemo(() => generateClassName('days'), []);
  const hoursClassName = useMemo(() => generateClassName('hours'), []);
  const minutesClassName = useMemo(() => generateClassName('minutes'), []);
  const secondsClassName = useMemo(() => generateClassName('seconds'), []);
  const pacificTimeOffset = useMeme(() => {
    const pacificTime = isDST ? 420 : 480;
    return pacificTime * 60 * 1000;
  }, [isDST]);

  useEffect(() => {
    if (!countdownDate) {
      /**
       * the date prop returns in the following format: "2023-11-21 23:56"
       * we have convert it to be a usable for the js Date object
       */
      const blokDateArray = date?.split(' ');
      const dateArray = blokDateArray?.[0]?.split('-');
      const timeArray = blokDateArray?.[1]?.split(':');
      const blokDateObj = new Date(
        `${dateArray?.[0]}-${dateArray?.[1]}-${dateArray?.[2]} ${timeArray?.[0]}:${timeArray?.[1]}`
      );
      const utcOffset = blokDateObj?.getTimezoneOffset() * 60 * 1000;
      const timezoneDifference = utcOffset - pacificTimeOffset;
      const utcDateObj = new Date(
        blokDateObj?.getTime() + utcOffset - timezoneDifference
      );
      setCountdownDate(
        new Date(
          Date.UTC(
            utcDateObj?.getFullYear(),
            utcDateObj?.getMonth(),
            utcDateObj?.getDate(),
            utcDateObj?.getHours(),
            utcDateObj?.getMinutes()
          )
        )
      );
    }
  }, [date, countdownDate, setCountdownDate]);

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
            percent={noTime ? 0 : (days / dayPieRange) * 100}
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
