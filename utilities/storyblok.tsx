import { apiPlugin, storyblokInit, StoryblokClient } from '@storyblok/react/rsc';
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
import { SbStoryCard } from '@/components/Storyblok/SbStoryCard';
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
import { SbCuratedStories } from '@/components/Storyblok/SbCuratedStories';
import { SbSearchResults } from '@/components/Storyblok/SbSearchResults';
import { SbAlert, SbAlertPicker } from '@/components/Storyblok/SbAlert';
import { SbTileCard } from '@/components/Storyblok/SbTileCard';
import { SbQuoteCard } from '@/components/Storyblok/SbQuoteCard';
import { SbGridThreeColumns } from '@/components/Storyblok/SbGridThreeColumns';
import { SbCountdown, SbCountdownPicker } from '@/components/Storyblok/SbCountdown';
import { SbAccordion } from '@/components/Storyblok/SbAccordion';
import { SbHomepageHero } from '@/components/Storyblok/SbHomepageHero';
import { SbCampaignImpact } from '@/components/Storyblok/SbCampaignImpact';
import { SbPoster } from '@/components/Storyblok/SbPoster';
import { SbCampaignHeader } from '@/components/Storyblok/SbCampaignPage';
import { SbCampaignCard } from '@/components/Storyblok/SbCampaignCard';
import { SbEmbedVideo } from '@/components/Storyblok/SbEmbedVideo';
import { SbGallerySlideshow } from '@/components/Storyblok/SbGallerySlideshow';

export const components = {
  alert: SbAlert,
  alertPicker: SbAlertPicker,
  page: SbPage,
  redirect: SbRedirect,
  storyPicker: SbStoryPicker,
  ctaLink: SbCtaLink,
  ctaGroup: SbCtaGroup,
  embedScript: SbEmbedScript,
  lockup: SbLockup,
  searchResults: SbSearchResults,
  // Cards
  basicCard: SbBasicCard,
  oodIconCard: SbIconCard,
  oodQuoteCard: SbQuoteCard,
  oodSupportCard: SbSupportCard,
  oodStoryCard: SbStoryCard,
  oodTileCard: SbTileCard,
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
  curatedStories: SbCuratedStories,
  gridThreeColumns: SbGridThreeColumns,
  rowOneColumn: SbRowOneColumn,
  rowTwoColumns: SbRowTwoColumns,
  rowThreeColumns: SbRowThreeColumns,
  section: SbSection,
  singleColumnContent: SbSingleColumnContent,
  // Media
  storyImage: SbStoryImage,
  embedVideo: SbEmbedVideo,
  // Endowed Positions
  endowedPositionsSearch: SbEndowedPositionsSearch,
  endowedPositionsSearchPicker: SbEndowedPositionsSearchPicker,
  // Countdown
  countdown: SbCountdown,
  countdownPicker: SbCountdownPicker,
  // Campaign
  oodCampaignHeader: SbCampaignHeader,
  oodCampaignImpact: SbCampaignImpact,
  oodCampaignCard: SbCampaignCard,
  // Complex
  accordion: SbAccordion,
  oodHomepageHero: SbHomepageHero,
  oodPoster: SbPoster,
  oodGallerySlideshow: SbGallerySlideshow,
};

export type GetStoryblokApiConfig = {
  accessToken?: string;
  isEditor?: boolean;
};

// Initialize Storyblok once at module load to avoid race conditions with component registration
// This ensures components are registered before any API calls are made
const storyblokApi = storyblokInit({
  accessToken: process.env.STORYBLOK_ACCESS_TOKEN,
  use: [apiPlugin],
  components,
  enableFallbackComponent: true,
  customFallbackComponent: (component) => {
    return <ComponentNotFound component={component} />;
  },
});

// Cache for editor client to avoid re-initialization
let editorClient: StoryblokClient | null = null;

export const getStoryblokClient = ({
  accessToken,
  isEditor = false,
}: GetStoryblokApiConfig = {}): StoryblokClient => {
  // For the editor with custom access token, reinitialize
  if (isEditor && accessToken) {
    // Initialize with the custom editor token (from URL query param)
    const customClient = storyblokInit({
      accessToken,
      use: [apiPlugin],
      components,
      enableFallbackComponent: true,
      customFallbackComponent: (component) => {
        return <ComponentNotFound component={component} />;
      },
    });
    return customClient();
  }

  // For the editor with default token, use cached client
  if (isEditor && !editorClient) {
    editorClient = storyblokInit({
      accessToken: process.env.STORYBLOK_PREVIEW_EDITOR_TOKEN,
      use: [apiPlugin],
      components,
      enableFallbackComponent: true,
      customFallbackComponent: (component) => {
        return <ComponentNotFound component={component} />;
      },
    })();
  }

  if (isEditor && editorClient) {
    return editorClient;
  }

  // For all server-side cases (SSR, SSG), use the pre-initialized client with registered components
  return storyblokApi();
};
