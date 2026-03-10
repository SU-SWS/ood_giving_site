import { useEffect, useEffectEvent } from 'react';

export const useHashLink = () => {
  const onReady = useEffectEvent(() => {
    const hash = window?.location?.hash?.replace('#', '');

    if (!hash) return;

    const el = document?.getElementById(hash);

    if (!el) return;

    const reduceMotion = !!window.matchMedia('(prefers-reduced-motion: reduce)')?.matches;
    el.scrollIntoView({ behavior: reduceMotion ? 'instant' : 'auto' });
    el.focus({ preventScroll: true });
  });

  useEffect(() => {
    setTimeout(() => {
      onReady();
    }, 100);
  }, []);
};
