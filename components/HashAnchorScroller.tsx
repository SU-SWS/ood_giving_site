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
    const cleanup = () => {
      observer.disconnect();
      clearTimeout(timeout);
    };

    let scrolled = false;
    const observer = new MutationObserver(() => {
      if (scrolled) return;
      const target = document.getElementById(decodedHash);
      if (!target) return;
      scrolled = true;
      cleanup();
      target.scrollIntoView({ block: 'start', inline: 'nearest' });
    });

    // Observe the narrowest available content container; fall back to body.
    const root = document.getElementById('main-content') ?? document.body;
    observer.observe(root, { childList: true, subtree: true });

    // Give up after 5 s to avoid leaking the observer on pages where the
    // target id never appears.
    const timeout = setTimeout(cleanup, 5000);

    return cleanup;
  }, [pathname, searchKey]);

  return null;
};
