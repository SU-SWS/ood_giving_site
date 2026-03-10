import { useEffect, useState } from 'react';

type UseHashLinkOptions = {
  isReady?: boolean,
};

export const useHashLink = ({ isReady = true }: UseHashLinkOptions = {}) => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    if (isReady && !init) {
      setInit(true);
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
