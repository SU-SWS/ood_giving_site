import { apiPlugin, storyblokInit } from '@storyblok/react/rsc';
import { ComponentNotFound } from '@/components/Storyblok/ComponentNotFound';
import { SbGlobalFooter } from '@/components/Storyblok/SbGlobalFooter';
import { SbLandingPage } from '@/components/Storyblok/SbLandingPage';
import { SbGlobalFooterPicker } from '@/components/Storyblok/SbGlobalFooterPicker';
import { SbPage } from '@/components/Storyblok/SbPage';
import { SbStoryOverviewPage } from '@/components/Storyblok/SbStoryOverviewPage';
import { SbCampaignPage } from '@/components/Storyblok/SbCampaignPage';
import { SbInteriorPage } from '@/components/Storyblok/SbInteriorPage';
import { SbSupportPage } from '@/components/Storyblok/SbSupportPage';
import { SbStoryPage } from '@/components/Storyblok/SbStoryPage';
import { SbStoryPicker } from '@/components/Storyblok/SbStoryPage';

export const components = {
  // TODO DS-1417: Remove and clean up page
  page: SbPage,
  storyPicker: SbStoryPicker,
  // Pages
  oodLandingPage: SbLandingPage,
  storyOverview: SbStoryOverviewPage,
  oodCampaignPage: SbCampaignPage,
  oodInteriorPage: SbInteriorPage,
  oodSupportPage: SbSupportPage,
  oodStory: SbStoryPage,
  // Identity
  globalFooter: SbGlobalFooter,
  globalFooterPicker: SbGlobalFooterPicker,
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
