'use client';
import { useLayoutEffect, useState } from 'react';
import { useMediaQuery } from 'usehooks-ts';
import { config } from '@/utilities/config';

// Custom hook to display mobile or desktop version of a component based on breakpoint value
export const useDisplay = (breakpoint: keyof typeof config.breakpoints = 'lg') => {
  const [showDesktop, setShowDesktop] = useState(true);
  const [showMobile, setShowMobile] = useState(true);
  const isMinWidth = useMediaQuery(`(min-width: ${config.breakpoints[breakpoint]}px)`);

  useLayoutEffect(() => {
    if (isMinWidth) {
      setShowDesktop(true);
      setShowMobile(false);
    } else {
      setShowDesktop(false);
      setShowMobile(true);
    }
  }, [isMinWidth]);

  return { showDesktop, showMobile };
};
