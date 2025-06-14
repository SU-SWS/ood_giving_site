'use client';
import { storyblokInit, apiPlugin } from '@storyblok/react/rsc';
import { ComponentNotFound } from '@/components/Storyblok/ComponentNotFound';
import { components } from '@/utilities/storyblok';

type ProviderProps = {
  children: React.ReactNode;
  isEditor?: boolean;
};

export const StoryblokProvider = ({ children, isEditor = false }: ProviderProps) => {
  let accessToken = 'thisisnotarealtokenasitisontheclientsideandgoesintothecode'; // No access token because this is in client side code.
  if (isEditor) {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      accessToken = urlParams.get('access_key') || accessToken;
    }
  }

  // Init the Storyblok client so we can use the Storyblok components.
  storyblokInit({
    accessToken,
    use: [apiPlugin],
    components,
    enableFallbackComponent: true,
    customFallbackComponent: (component) => {
      return <ComponentNotFound component={component} />;
    },
  });

  return children;
};
