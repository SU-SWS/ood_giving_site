'use client';
import { useMemo } from 'react';
import { parse } from 'date-fns';

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
  const targetDate = useMemo(() => parse(date, 'yyyy-MM-dd T', new Date()), [date]);
  const displayHours = useMemo(() => hasDays ? hours)
};
