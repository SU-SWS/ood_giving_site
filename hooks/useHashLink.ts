import { useEffect, useEffectEvent, useState } from 'react';

type UseHashLinkOptions = {
  isReady?: boolean,
};

export const useHashLink = ({ isReady = true }: UseHashLinkOptions = {}) => {
  const [init, setInit] = useState(false);

  const onInit = useEffectEvent(() => {
    setInit(true);
  });

  useEffect(() => {
    if (isReady && !init) {
      onInit();
      const hash = window?.location?.hash?.replace('#', '');
      if (hash) {
        const el = document?.getElementById(hash);
        if (el) {
          const reduceMotion = !!window.matchMedia('(prefers-reduced-motion: reduce)')?.matches;
          el.scrollIntoView({ behavior: reduceMotion ? 'instant' : 'smooth' });
          el.focus({ preventScroll: true });
        }
      }
    }
  }, [isReady, init]);
};
