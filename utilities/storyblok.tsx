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
import { Redirect } from '@/components/Redirect';

export const components = {
  // TODO DS-1417: Remove and clean up page
  page: SbPage,
  redirect: Redirect,
  storyPicker: SbStoryPicker,
  // Pages
  oodCampaignPage: SbCampaignPage,
  oodInteriorPage: SbInteriorPage,
  oodLandingPage: SbLandingPage,
  oodStory: SbStoryPage,
  oodSupportPage: SbSupportPage,
  storyOverview: SbStoryOverviewPage,
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
