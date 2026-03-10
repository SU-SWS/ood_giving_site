import { useEffect, useEffectEvent } from 'react';

export const useHashLink = () => {
  const onReady = useEffectEvent(() => {
    const hash = window?.location?.hash?.replace('#', '');

    if (!hash) return;

    const el = document?.getElementById(hash);

    if (!el) return;

    const prevTabIndex = el.getAttribute('tabindex');
    el.setAttribute('tabindex', '-1');
    el.scrollIntoView({ behavior: 'instant' });
    el.focus({ preventScroll: true });
    if (prevTabIndex) {
      el.setAttribute('tabindex', prevTabIndex);
    } else {
      el.removeAttribute('tabindex');
    }
  });

  useEffect(() => {
    setTimeout(() => {
      onReady();
    }, 100);
  }, []);
};
