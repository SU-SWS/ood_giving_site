import RichTextField from "./richTextField"
import Page from './page'
import Grid from './grid'
import Feature from './feature'
import FeaturedImage from './featuredImage' // Might remove
import IntroText from './typography/introText' // Might remove
import ComponentNotFound from './component_not_found'
// Stanford identity elements
import GlobalFooter from './identity/globalFooter'
import Lockup from './identity/lockup'
// OOD specific components
import OodHeader from './ood/oodHeader'
import OodHero from './ood/oodHero'
import OodLocalFooter from './ood/oodLocalFooter'
import OodIconCard from './ood/oodIconCard'
import OodPoster from './ood/oodPoster'
import OodQuoteCard from './ood/oodQuoteCard'
import OodQuoteSlider from './ood/oodQuoteSlider'
import OodTileCard from './ood/oodTileCard'
// Navigation components
import NavItem from './navigation/navItem'
import OodSubMenu from './navigation/oodSubMenu'
import OodMegaMenu from './navigation/oodMegaMenu'
import OodMegaMenuSection from './navigation/oodMegaMenuSection'
import OodMegaMenuCard from './navigation/oodMegaMenuCard'
import OodNavigationLink from './navigation/oodNavigationLink'
import OodNavigationLinkGroup from './navigation/oodNavigationLinkGroup'
import OodNavigationColumn from './navigation/oodNavigationColumn'
// Layout components
import ColumnGrid from './layout/columnGrid'
import RowWithThreeColumns from './layout/rowWithThreeColumns'
import Section from './layout/section'
// Simple components
import Button from './simple/button'
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
  grid: Grid,
  feature: Feature,
  button: Button,
  quote: Quote,
  pageBuilder: PageBuilder,
  richTextField: RichTextField,
  columnGrid: ColumnGrid,
  rowWithThreeColumns: RowWithThreeColumns,
  section: Section,
  introText: IntroText,
  featuredImage: FeaturedImage,
  globalFooter: GlobalFooter,
  lockup: Lockup,
  navItem: NavItem,
  oodHeader: OodHeader,
  oodSubMenu: OodSubMenu,
  oodIconCard: OodIconCard,
  oodLocalFooter: OodLocalFooter,
  oodPoster: OodPoster,
  oodMegaMenu: OodMegaMenu,
  oodMegaMenuSection: OodMegaMenuSection,
  oodMegaMenuCard: OodMegaMenuCard,
  oodNavigationLink: OodNavigationLink,
  oodNavigationLinkGroup: OodNavigationLinkGroup,
  oodNavigationColumn: OodNavigationColumn,
  oodTileCard: OodTileCard,
  oodQuoteCard: OodQuoteCard,
  oodQuoteSlider: OodQuoteSlider,
  oodHero: OodHero,
  card: Card,
  event: Event,
  eventSession: EventSession,
  person: Person,
  product: Product,
}

const Components = (type) => {
  if (typeof ComponentList[type] === 'undefined') {
    return ComponentNotFound
  }
  return ComponentList[type]
}

export default Components
