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
import { SbLocalFooterPicker } from '@/components/Storyblok/SbLocalFooterPicker';
import { SbLocalFooter } from '@/components/Storyblok/SbLocalFooter';
import { SbCtaLink } from '@/components/Storyblok/SbCtaLink';
import { SbNavItem } from '@/components/Storyblok/SbNavItem';
import { SbLockup } from '@/components/Storyblok/SbLockup';
import { SbSingleColumnContent } from '@/components/Storyblok/SbSingleColumnContent';
import { SbStoryImage } from '@/components/Storyblok/SbStoryImage';
import { SbSection } from '@/components/Storyblok/SbSection';
import { SbRowOneColumn } from '@/components/Storyblok/SbRowOneColumn';
import { SbBasicCard } from '@/components/Storyblok/SbBasicCard';

export const components = {
  // TODO DS-1417: Remove and clean up page
  page: SbPage,
  redirect: Redirect,
  storyPicker: SbStoryPicker,
  ctaLink: SbCtaLink,
  navItem: SbNavItem,
  lockup: SbLockup,
  // Cards
  basicCard: SbBasicCard,
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
  localFooterPicker: SbLocalFooterPicker,
  oodLocalFooter: SbLocalFooter,
  // Layout
  rowOneColumn: SbRowOneColumn,
  section: SbSection,
  singleColumnContent: SbSingleColumnContent,
  // Media
  storyImage: SbStoryImage,
};

export type GetStoryblokApiConfig = {
  accessToken?: string;
  isEditor?: boolean;
};

export const getStoryblokApi = ({
  accessToken,
  isEditor,
}: GetStoryblokApiConfig = {}) => {
  accessToken ??= isEditor ? process.env.STORYBLOK_PREVIEW_EDITOR_TOKEN : process.env.STORYBLOK_ACCESS_TOKEN;

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
