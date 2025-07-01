import { apiPlugin, storyblokInit } from '@storyblok/react/rsc';
import { ComponentNotFound } from '@/components/Storyblok/ComponentNotFound';
import { SbContentMenuPicker } from '@/components/Storyblok/SbContentMenu';
import { SbEmbedScript } from '@/components/Storyblok/SbEmbedScript';
import { SbGlobalFooter } from '@/components/Storyblok/SbGlobalFooter';
import { SbLandingPage } from '@/components/Storyblok/SbLandingPage';
import { SbGlobalFooterPicker } from '@/components/Storyblok/SbGlobalFooterPicker';
import { SbPage } from '@/components/Storyblok/SbPage';
import { SbStoryOverviewPage } from '@/components/Storyblok/SbStoryOverviewPage';
import { SbCampaignPage } from '@/components/Storyblok/SbCampaignPage/SbCampaignPage';
import { SbInteriorPage } from '@/components/Storyblok/SbInteriorPage';
import { SbSupportPage } from '@/components/Storyblok/SbSupportPage';
import { SbStory } from '@/components/Storyblok/SbStory';
import { SbStoryPicker } from '@/components/Storyblok/SbStory';
import { SbRedirect } from '@/components/Storyblok/SbRedirect';
import { SbLocalFooterPicker } from '@/components/Storyblok/SbLocalFooterPicker';
import { SbLocalFooter } from '@/components/Storyblok/SbLocalFooter';
import { SbCtaLink } from '@/components/Storyblok/SbCtaLink';
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
import { SbRowTwoColumns } from '@/components/Storyblok/SbRowTwoColumns';
import { SbRowThreeColumns } from '@/components/Storyblok/SbRowThreeColumns';
import { SbColumnGrid } from '@/components/Storyblok/SbColumnGrid';
import { SbBasicCard } from '@/components/Storyblok/SbBasicCard';
import { SbCtaGroup } from '@/components/Storyblok/SbCtaGroup';
import { SbIconCard } from '@/components/Storyblok/SbIconCard';
import { SbSupportCard } from '@/components/Storyblok/SbSupportCard';
import { SbEndowedPositionsSearch, SbEndowedPositionsSearchPicker } from '@/components/Storyblok/SbEndowedPositionsSearch';

export const components = {
  page: SbPage,
  redirect: SbRedirect,
  storyPicker: SbStoryPicker,
  ctaLink: SbCtaLink,
  ctaGroup: SbCtaGroup,
  embedScript: SbEmbedScript,
  lockup: SbLockup,
  // Cards
  basicCard: SbBasicCard,
  oodIconCard: SbIconCard,
  oodSupportCard: SbSupportCard,
  // Pages
  oodCampaignPage: SbCampaignPage,
  oodInteriorPage: SbInteriorPage,
  oodLandingPage: SbLandingPage,
  oodStory: SbStory,
  oodSupportPage: SbSupportPage,
  storyOverview: SbStoryOverviewPage,
  // Identity
  oodLocalHeader: SbLocalHeader,
  localHeaderPicker: SbLocalHeaderPicker,
  globalFooter: SbGlobalFooter,
  globalFooterPicker: SbGlobalFooterPicker,
  localFooterPicker: SbLocalFooterPicker,
  oodLocalFooter: SbLocalFooter,
  // Navigation
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
  columnGrid: SbColumnGrid,
  rowOneColumn: SbRowOneColumn,
  rowTwoColumns: SbRowTwoColumns,
  rowThreeColumns: SbRowThreeColumns,
  section: SbSection,
  singleColumnContent: SbSingleColumnContent,
  // Media
  storyImage: SbStoryImage,
  // Endowed Positions
  endowedPositionsSearch: SbEndowedPositionsSearch,
  endowedPositionsSearchPicker: SbEndowedPositionsSearchPicker,
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
