'use client';
import { useEffect, useMemo, useState } from 'react';
import {
  parseJSON,
  differenceInSeconds,
  secondsToMinutes,
  secondsToHours,
} from 'date-fns';
import { TZDate, tz } from '@date-fns/tz';

type CountdownProps = {
  date?: string;
  dayPieRange?: number;
  hourPieRange?: number;
  hasDays?: boolean;
  // isDST?: boolean;
};

export const Countdown = ({
  date,
  dayPieRange,
  hourPieRange,
  hasDays = false,
  // isDST = false,
}: CountdownProps) => {
  const [nowInPT, setnowInPT] = useState(TZDate.tz('America/Los_Angeles'));
  const targetDate = useMemo(() => new TZDate(parseJSON(date), 'America/Los_Angeles'), [date]);
  const diffInSeconds = useMemo(() => differenceInSeconds(targetDate, nowInPT), [targetDate, nowInPT]);
  const seconds = useMemo(() => diffInSeconds % 60, [diffInSeconds]);
  const minutes = useMemo(() => secondsToMinutes(diffInSeconds) % 60, [diffInSeconds]);
  const hours = useMemo(() => (
    hasDays
      ? secondsToHours(diffInSeconds)
      : secondsToHours(diffInSeconds) % 24
    ), [hasDays, diffInSeconds]);
  const days = useMemo(() => (
    hasDays
      ? secondsToHours(diffInSeconds) / 24
      : undefined
  ), [hasDays, diffInSeconds]);

  // Reset now every second
  useEffect(() => {
    const timer = setInterval(() => {
      setnowInPT(TZDate.tz('America/Los_Angeles'));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div aria-atomic role="timer">

    </div>
  );
};
