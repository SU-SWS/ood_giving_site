'use client';

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  parse,
  differenceInSeconds,
  secondsToMinutes,
  secondsToHours,
  isAfter,
} from 'date-fns';
import { TZDate } from '@date-fns/tz';
import { CountdownPie } from './CountdownPie';
import { Grid } from '@/components/Grid';
import * as styles from './Countdown.styles';

type CountdownProps = {
  date?: string;
  dayPieRange?: number;
  hourPieRange?: number;
  hasDays?: boolean;
};

export const Countdown = ({
  date,
  dayPieRange,
  hourPieRange,
  hasDays = false,
}: CountdownProps) => {
  const timerRef = useRef(null);
  const [nowInPT, setnowInPT] = useState(TZDate.tz('America/Los_Angeles'));
  const targetDateInPT = useMemo(() => date ? new TZDate(parse(date, 'yyyy-MM-dd HH:mm', TZDate.tz('UTC')), 'America/Los_Angeles') : undefined, [date]);
  const diffInSeconds = useMemo(() => (
    Math.max(differenceInSeconds(targetDateInPT, nowInPT), 0)
  ), [targetDateInPT, nowInPT]);
  const seconds = useMemo(() => diffInSeconds % 60, [diffInSeconds]);
  const minutes = useMemo(() => secondsToMinutes(diffInSeconds) % 60, [diffInSeconds]);
  const hours = useMemo(() => (
    hasDays
      ? secondsToHours(diffInSeconds) % 24
      : secondsToHours(diffInSeconds)
    ), [hasDays, diffInSeconds]);
  const days = useMemo(() => (
    hasDays
      ? Math.floor(secondsToHours(diffInSeconds) / 24)
      : undefined
  ), [hasDays, diffInSeconds]);

  // Reset "now" every second
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setnowInPT(TZDate.tz('America/Los_Angeles'));
    }, 1000);

    return () => clearInterval(timerRef?.current);
  }, []);

  // Stop timer when we hit the target datetime
  useEffect(() => {
    if (!!timerRef?.current && isAfter(nowInPT, targetDateInPT)) {
      clearInterval(timerRef.current);
    }
  }, [nowInPT, targetDateInPT]);

  return (
    <Grid
      xs={hasDays ? 2 : 3} md={hasDays ? 4 : 3}
      justifyContent="evenly"
      aria-atomic
      role="timer"
      className={styles.countdown({ hasDays })}
      >
      {hasDays && (
        <CountdownPie filled={days} total={dayPieRange} description="Days" />
      )}
      <CountdownPie filled={hours} total={hasDays ? 24 : hourPieRange} description="Hours" />
      <CountdownPie filled={minutes} total={60} description="Minutes" />
      <CountdownPie filled={seconds} total={60} description="Seconds" />
    </Grid>
  );
};
