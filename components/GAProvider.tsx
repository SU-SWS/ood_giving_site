'use client';
import { GoogleTagManager } from '@next/third-parties/google';
import { useEffect } from 'react';
import useUTMs from '@/hooks/useUTMs';
import { isActiveEnv } from '@/utilities/getActiveEnv';
// TODO: Need GTM ID
const GTM_ID = '';

export default function GAProvider({ children }: { children: React.ReactNode }) {
  const { setUTMCookie, deleteUTMCookie } = useUTMs();

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    setUTMCookie();
    return () => {
      deleteUTMCookie();
    };
  }, [setUTMCookie, deleteUTMCookie]);

  // Pass through children.
  return children;
};

/**
 *
 * @returns GTAG script
 */
export const GTAG = () => {
  if (GTM_ID && isActiveEnv(['production', 'branch-deploy'])) {
    return (
      <GoogleTagManager gtmId={GTM_ID} />
    );
  }
  return null;
};
