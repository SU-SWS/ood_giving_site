'use client';
import { getStoryblokClient } from '@/utilities/storyblok';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

type ProviderProps = {
  children: React.ReactNode;
  isEditor?: boolean;
};

export const StoryblokProvider = ({ children }: ProviderProps) => {
  const pathname = usePathname();
  const isEditor = useMemo(() => !!pathname?.startsWith('/editor/'), [pathname]);
  // No access token because this is in client side code.
  let accessToken = 'thisisnotarealtokenasitisontheclientsideandgoesintothecode';

  if (isEditor) {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      accessToken = urlParams.get('access_key') || accessToken;
    }
  }

  getStoryblokClient({ accessToken, isEditor });

  return children;
};
