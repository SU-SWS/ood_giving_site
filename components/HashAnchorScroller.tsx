'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export const HashAnchorScroller = (): null => {
  const pathname = usePathname();
  const searchKey = useSearchParams().toString();

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;

    let decodedHash = hash;
    try {
      decodedHash = decodeURIComponent(hash);
    } catch {
      decodedHash = hash;
    }

    // If the target is already in the DOM, scroll immediately and stop.
    const immediate = document.getElementById(decodedHash);
    if (immediate) {
      immediate.scrollIntoView({ block: 'start', inline: 'nearest' });
      return;
    }

    // Otherwise watch for the target to be inserted (streaming/Suspense),
    // scroll exactly once, then disconnect.
    let scrolled = false;
    const observer = new MutationObserver(() => {
      if (scrolled) return;
      const target = document.getElementById(decodedHash);
      if (!target) return;
      scrolled = true;
      observer.disconnect();
      target.scrollIntoView({ block: 'start', inline: 'nearest' });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
    };
  }, [pathname, searchKey]);

  return null;
};
