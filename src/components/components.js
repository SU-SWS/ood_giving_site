import RichTextField from "./richTextField"
import Page from './page'
import EmbedScript from './embedScript'
import ComponentNotFound from './component_not_found'
// Site identity elements
import GlobalFooter from './identity/globalFooter'
import GlobalFooterPicker from './identity/globalFooterPicker'
import OodLocalHeader from './identity/oodLocalHeader'
import OodLocalFooter from './identity/oodLocalFooter'
import LocalFooterPicker from './identity/localFooterPicker'
import LocalHeaderPicker from './identity/localHeaderPicker'
import Lockup from './identity/lockup'
// OOD specific components
import OodHomepageHero from './ood/oodHomepageHero'
import OodIconCard from './ood/oodIconCard'
import OodSupportCard from './ood/oodSupportCard'
import OodPoster from './ood/oodPoster'
import OodQuoteCard from './ood/oodQuoteCard'
import OodQuoteSlider from './ood/oodQuoteSlider'
import OodTileCard from './ood/oodTileCard'
// Navigation components
import NavItem from './navigation/navItem'
import ContentNavItem from './navigation/contentNavItem'
import ContentMenuParentItems from './navigation/contentMenuParentItem'
import ContentNestedMenu from './navigation/contentNestedMenu'
import OodContentMenu from './navigation/oodContentMenu'
import ContentMenuPicker from './navigation/contentMenuPicker'
import OodSubMenu from './navigation/oodSubMenu'
import OodMegaMenu from './navigation/oodMegaMenu'
import OodMegaMenuSection from './navigation/oodMegaMenuSection'
import OodMegaMenuCard from './navigation/oodMegaMenuCard'
import OodNavigationLink from './navigation/oodNavigationLink'
import OodNavigationLinkGroup from './navigation/oodNavigationLinkGroup'
import OodNavigationColumn from './navigation/oodNavigationColumn'
// Layout components
import ColumnGrid from './layout/columnGrid'
import RowThreeColumns from './layout/rowThreeColumns'
import GridThreeColumns from './layout/gridThreeColumns'
import Section from './layout/section'
import SingleColumnContent from './layout/singleColumnContent'
// Page Type Components
import OodInteriorPage from './page-types/oodInteriorPage'
import OodLandingPage from './page-types/oodLandingPage'
import OodStory from './page-types/oodStory'
import OodSupportPage from './page-types/oodSupportPage'
// Simple components
import Button from './simple/button'
import StoryImage from './simple/storyImage'
// ADAPT POC components created by Katria
import Card from './poc/card'
import Quote from './poc/quote'
import PageBuilder from './poc/pageBuilder'
import Event from './poc/event'
import EventSession from './poc/eventSession'
import Person from './poc/person'
import Product from './poc/product'

const ComponentList = {
  page: Page,
  embedScript: EmbedScript,
  button: Button,
  storyImage: StoryImage,
  quote: Quote,
  pageBuilder: PageBuilder,
  richTextField: RichTextField,
  columnGrid: ColumnGrid,
  rowThreeColumns: RowThreeColumns,
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
  oodNavigationLink: OodNavigationLink,
  oodNavigationLinkGroup: OodNavigationLinkGroup,
  oodNavigationColumn: OodNavigationColumn,
  oodContentMenu: OodContentMenu,
  contentMenuPicker: ContentMenuPicker,
  contentNavItem: ContentNavItem,
  contentMenuParentItem: ContentMenuParentItems,
  contentNestedMenu: ContentNestedMenu,
  oodTileCard: OodTileCard,
  oodQuoteCard: OodQuoteCard,
  oodQuoteSlider: OodQuoteSlider,
  oodHomepageHero: OodHomepageHero,
  oodInteriorPage: OodInteriorPage,
  oodLandingPage: OodLandingPage,
  oodStory: OodStory,
  oodSupportPage: OodSupportPage,
  card: Card,
  event: Event,
  eventSession: EventSession,
  person: Person,
  product: Product,
  gridThreeColumns: GridThreeColumns
}

const Components = (type) => {
  if (typeof ComponentList[type] === 'undefined') {
    return ComponentNotFound
  }
  return ComponentList[type]
}

export default Components
