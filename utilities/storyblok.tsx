import { apiPlugin, storyblokInit } from '@storyblok/react/rsc';
import { ComponentNotFound } from '@/components/Storyblok/ComponentNotFound';
import { SbContentMenuPicker } from '@/components/Storyblok/SbContentMenuPicker';
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
import { SbRedirect } from '@/components/Storyblok/SbRedirect';
import { SbLocalFooterPicker } from '@/components/Storyblok/SbLocalFooterPicker';
import { SbLocalFooter } from '@/components/Storyblok/SbLocalFooter';
import { SbCtaLink } from '@/components/Storyblok/SbCtaLink';
import { SbNavItem } from '@/components/Storyblok/SbNavItem';
import { SbLockup } from '@/components/Storyblok/SbLockup';
import { SbSingleColumnContent } from '@/components/Storyblok/SbSingleColumnContent';
import { SbStoryImage } from '@/components/Storyblok/SbStoryImage';
import { SbLocalHeader } from '@/components/Storyblok/SbLocalHeader';
import { SbLocalHeaderPicker } from '@/components/Storyblok/SbLocalHeaderPicker';
import {
  SbContentMenu,
  SbContentNestedMenu,
  SbContentNavItem,
  SbContentMenuParentItem,
} from '@/components/Storyblok/SbContentMenu';
import { SbMegaMenu } from '@/components/Storyblok/SbMegaMenu/SbMegaMenu';
import { SbSubMenu } from '@/components/Storyblok/SbSubMenu';
import {
  SbMegaMenuNavItem,
  SbMegaMenuSection,
  SbMegaMenuLinkGroup,
  SbMegaMenuCard,
} from '@/components/Storyblok/SbMegaMenu';
import { SbSection } from '@/components/Storyblok/SbSection';
import { SbRowOneColumn } from '@/components/Storyblok/SbRowOneColumn';
import { SbBasicCard } from '@/components/Storyblok/SbBasicCard';
import { SbCtaGroup } from '@/components/Storyblok/SbCtaGroup';
import { SbIconCard } from '@/components/Storyblok/SbIconCard';
import { SbSupportCard } from '@/components/Storyblok/SbSupportCard';

export const components = {
  page: SbPage,
  redirect: SbRedirect,
  storyPicker: SbStoryPicker,
  ctaLink: SbCtaLink,
  ctaGroup: SbCtaGroup,
  navItem: SbNavItem,
  lockup: SbLockup,
  // Cards
  basicCard: SbBasicCard,
  oodIconCard: SbIconCard,
  oodSupportCard: SbSupportCard,
  // Pages
  oodCampaignPage: SbCampaignPage,
  oodInteriorPage: SbInteriorPage,
  oodLandingPage: SbLandingPage,
  oodStory: SbStoryPage,
  oodSupportPage: SbSupportPage,
  storyOverview: SbStoryOverviewPage,
  // Identity
  oodLocalHeader: SbLocalHeader,
  localHeaderPicker: SbLocalHeaderPicker,
  globalFooter: SbGlobalFooter,
  globalFooterPicker: SbGlobalFooterPicker,
  localFooterPicker: SbLocalFooterPicker,
  oodLocalFooter: SbLocalFooter,
  // Navigation'
  contentMenuPicker: SbContentMenuPicker,
  oodContentMenu: SbContentMenu,
  contentMenuParentItem: SbContentMenuParentItem,
  contentNavItem: SbContentNavItem,
  contentNestedMenu: SbContentNestedMenu,
  oodMegaMenu: SbMegaMenu,
  oodSubMenu: SbSubMenu,
  oodMegaMenuNavItem: SbMegaMenuNavItem,
  oodMegaMenuSection: SbMegaMenuSection,
  oodMegaMenuLinkGroup: SbMegaMenuLinkGroup,
  oodMegaMenuCard: SbMegaMenuCard,
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
