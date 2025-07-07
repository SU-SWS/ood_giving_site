'use client';
import { useMemo, useState } from 'react';
import { parse, interval, intervalToDuration } from 'date-fns';

type CountdownProps = {
  date?: string;
  dayPieRange?: number;
  hourPieRange?: number;
  hasDays?: boolean;
  isDST?: boolean;
};

export const Countdown = ({
  date,
  dayPieRange,
  hourPieRange,
  hasDays = false,
  isDST = false,
}: CountdownProps) => {
  const [now, setNow] = useState(new Date());
  const targetDate = useMemo(() => parse(date, 'yyyy-MM-dd T', new Date()), [date]);
  const {
    days,
    hours,
    minutes,
    seconds,
  } = useMemo(() => intervalToDuration(interval(now, targetDate)), [now, targetDate]);

  return (
    <div aria-atomic>

    </div>
  );
};
