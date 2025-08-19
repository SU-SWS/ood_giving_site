'use client';
import { initStoryblokClient } from '@/utilities/storyblok';

type ProviderProps = {
  children: React.ReactNode;
  isEditor?: boolean;
};

export const StoryblokProvider = ({ children, isEditor = false }: ProviderProps) => {
  // No access token because this is in client side code.
  let accessToken = 'thisisnotarealtokenasitisontheclientsideandgoesintothecode';

  if (isEditor) {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      accessToken = urlParams.get('access_key') || accessToken;
    }
  }

  initStoryblokClient({ accessToken, isEditor });

  return children;
};
