import { useEffect, useEffectEvent } from 'react';

type UseHashLinkOptions = {
  isReady?: boolean,
};

export const useHashLink = ({ isReady = true }: UseHashLinkOptions = {}) => {
  const onReady = useEffectEvent(() => {
    const hash = window?.location?.hash?.replace('#', '');

    if (!hash) return;

    const el = document?.getElementById(hash);

    if (!el) return;

    const reduceMotion = !!window.matchMedia('(prefers-reduced-motion: reduce)')?.matches;
    el.scrollIntoView({ behavior: reduceMotion ? 'instant' : 'smooth' });
    el.focus({ preventScroll: true });
  });

  useEffect(() => {
    if (isReady) {
      setInterval(() => {
        onReady();
      }, 100)
    }
  }, [isReady]);
};
