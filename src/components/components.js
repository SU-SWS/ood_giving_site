import Page from './page'
import RichTextField from "../utilities/richTextField"
import ComponentNotFound from './component_not_found'
// User & Authentication
import LoginButton from './auth/loginButton'
import LogoutButton from './auth/logoutButton'
import UserInfoBlock from './auth/userInfoBlock'
import WhoIs from './auth/whoIs'

// Site Identity Elements
import GlobalFooter from './identity/globalFooter'
import GlobalFooterPicker from './identity/globalFooterPicker'
import OodLocalHeader from './identity/oodLocalHeader'
import OodLocalFooter from './identity/oodLocalFooter'
import LocalFooterPicker from './identity/localFooterPicker'
import LocalHeaderPicker from './identity/localHeaderPicker'
import Lockup from './identity/lockup'
// Cards
import BasicCard from './cards/basicCard'
import OodIconCard from './cards/oodIconCard'
import OodSupportCard from './cards/oodSupportCard'
import OodQuoteCard from './cards/oodQuoteCard'
import OodStoryCard from './cards/oodStoryCard'
import OodTileCard from './cards/oodTileCard'
// OOD Specific Components
import OodHomepageHero from './composite/oodHomepageHero'
import OodPoster from './composite/oodPoster'
import OodQuoteSlider from './composite/oodQuoteSlider'
// Navigation Components
import NavItem from './navigation/navItem'
import ContentNavItem from './navigation/contentMenu/contentNavItem'
import ContentMenuParentItems from './navigation/contentMenu/contentMenuParentItem'
import ContentNestedMenu from './navigation/contentMenu/contentNestedMenu'
import OodContentMenu from './navigation/contentMenu/oodContentMenu'
import ContentMenuPicker from './navigation/contentMenu/contentMenuPicker'
import OodSubMenu from './navigation/oodSubMenu'
import OodMegaMenu from './navigation/megaMenu/oodMegaMenu'
import OodMegaMenuSection from './navigation/megaMenu/oodMegaMenuSection'
import OodMegaMenuCard from './navigation/megaMenu/oodMegaMenuCard'
import OodMegaMenuNavItem from './navigation/megaMenu/oodMegaMenuNavItem'
import OodMegaMenuLinkGroup from './navigation/megaMenu/oodMegaMenuLinkGroup'
// Layout Components
import ColumnGrid from './layout/columnGrid'
import CuratedStories from './layout/curatedStories'
import RowOneColumn from './layout/rowOneColumn'
import RowTwoColumns from './layout/rowTwoColumns'
import RowThreeColumns from './layout/rowThreeColumns'
import GridThreeColumns from './layout/gridThreeColumns'
import Section from './layout/section'
import SingleColumnContent from './layout/singleColumnContent'
// Page Type Components
import OodInteriorPage from './page-types/oodInteriorPage'
import OodLandingPage from './page-types/oodLandingPage'
import OodStory from './page-types/story/oodStory'
import OodSupportPage from './page-types/oodSupportPage'
import StoryOverview from './page-types/storyOverview'
// Simple Components
import AspectRatioImage from './media/aspectRatioImage'
import CtaLink from './simple/ctaLink'
import EmbedScript from './simple/embedScript'
import GiveGabForm from './simple/giveGabForm'
import StoryImage from './media/storyImage'
import StoryPicker from './page-types/story/storyPicker'
// Composite Components
import Accordion from './composite/accordion'
import AccordionItem from './composite/accordionItem'

const ComponentList = {
  page: Page,
  embedScript: EmbedScript,
  giveGabForm: GiveGabForm,
  storyImage: StoryImage,
  ctaLink: CtaLink,
  accordionItem: AccordionItem,
  accordion: Accordion,
  richTextField: RichTextField,
  columnGrid: ColumnGrid,
  curatedStories: CuratedStories,
  rowThreeColumns: RowThreeColumns,
  rowTwoColumns: RowTwoColumns,
  rowOneColumn: RowOneColumn,
  section: Section,
  singleColumnContent: SingleColumnContent,
  globalFooter: GlobalFooter,
  globalFooterPicker: GlobalFooterPicker,
  oodLocalFooter: OodLocalFooter,
  localFooterPicker: LocalFooterPicker,
  lockup: Lockup,
  navItem: NavItem,
  oodLocalHeader: OodLocalHeader,
  localHeaderPicker: LocalHeaderPicker,
  oodSubMenu: OodSubMenu,
  oodIconCard: OodIconCard,
  oodSupportCard: OodSupportCard,
  oodPoster: OodPoster,
  oodMegaMenu: OodMegaMenu,
  oodMegaMenuSection: OodMegaMenuSection,
  oodMegaMenuCard: OodMegaMenuCard,
  oodMegaMenuNavItem: OodMegaMenuNavItem,
  oodMegaMenuLinkGroup: OodMegaMenuLinkGroup,
  oodContentMenu: OodContentMenu,
  contentMenuPicker: ContentMenuPicker,
  contentNavItem: ContentNavItem,
  contentMenuParentItem: ContentMenuParentItems,
  contentNestedMenu: ContentNestedMenu,
  basicCard: BasicCard,
  oodTileCard: OodTileCard,
  oodQuoteCard: OodQuoteCard,
  oodQuoteSlider: OodQuoteSlider,
  oodHomepageHero: OodHomepageHero,
  oodInteriorPage: OodInteriorPage,
  oodLandingPage: OodLandingPage,
  oodStory: OodStory,
  oodStoryCard: OodStoryCard,
  storyOverview: StoryOverview,
  storyPicker: StoryPicker,
  oodSupportPage: OodSupportPage,
  gridThreeColumns: GridThreeColumns,
  loginButton: LoginButton,
  logoutButton: LogoutButton,
  userInfoBlock: UserInfoBlock,
  whoIs: WhoIs,
}

const Components = (type) => {
  if (typeof ComponentList[type] === 'undefined') {
    return ComponentNotFound
  }
  return ComponentList[type]
}

export default Components
