import { apiPlugin, storyblokInit } from '@storyblok/react/rsc';
import { ComponentNotFound } from '@/components/Storyblok/ComponentNotFound';

export const components = {

};

export type GetStoryblokApiConfig = {
  accessToken?: string;
  isPreview?: boolean;
};

export const getStoryblokApi = ({
  accessToken,
  isPreview,
}: GetStoryblokApiConfig = {}) => {
  accessToken ??= isPreview ? process.env.STORYBLOK_PREVIEW_EDITOR_TOKEN : process.env.STORYBLOK_ACCESS_TOKEN;
  
  return storyblokInit({
    accessToken,
    use: [apiPlugin],
    components,
    enableFallbackComponent: true,
    customFallbackComponent: (component) => {
      return <ComponentNotFound component={component} />;
    },
  })();
};
