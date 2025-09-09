'use client';
import { GoogleTagManager } from '@next/third-parties/google';
import { useEffect } from 'react';
import useUTMs from '@/hooks/useUTMs';
import { isProduction } from '@/utilities/getActiveEnv';
const GTM_ID = 'GTM-5RGQ5DD';

export const GAProvider = ({ children }: { children: React.ReactNode }) => {
  const { setUTMCookie, deleteUTMCookie } = useUTMs();

  useEffect(() => {
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
  if (GTM_ID && isProduction()) {
    return (
      <GoogleTagManager gtmId={GTM_ID} />
    );
  }
  return null;
};
