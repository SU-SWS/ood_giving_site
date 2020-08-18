import RichTextField from "./richTextField"
import Page from './page'
import Grid from './grid'
import Feature from './feature'
import TileCard from './tileCard'
import OodQuoteCard from './oodQuoteCard'
import OodQuoteSlider from './oodQuoteSlider'
import Hero from './hero'
import FeaturedImage from './featuredImage' // Might remove
import IntroText from './typography/introText' // Might remove
import ComponentNotFound from './component_not_found'
// Stanford identity elements
import GlobalFooter from './identity/globalFooter'
import GlobalHeader from './identity/globalHeader'
import Lockup from './identity/lockup'
// Navigation components
import NavItem from './navigation/navItem'
import OodEyebrowMenu from './navigation/oodEyebrowMenu'
import OodMegaMenu from './navigation/oodMegaMenu'
import OodMegaMenuSection from './navigation/oodMegaMenuSection'
import OodMegaMenuCard from './navigation/oodMegaMenuCard'
import OodNavigationLink from './navigation/oodNavigationLink'
import OodNavigationLinkGroup from './navigation/oodNavigationLinkGroup'
import OodNavigationColumn from './navigation/oodNavigationColumn'
// Layout components
import Column from './layout/column'
import Row from './layout/row'
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
  tileCard: TileCard,
  oodQuoteCard: OodQuoteCard,
  oodQuoteSlider: OodQuoteSlider,
  hero: Hero,
  richTextField: RichTextField,
  column: Column,
  row: Row,
  section: Section,
  introText: IntroText,
  featuredImage: FeaturedImage,
  globalFooter: GlobalFooter,
  globalHeader: GlobalHeader,
  lockup: Lockup,
  navItem: NavItem,
  oodEyebrowMenu: OodEyebrowMenu,
  oodMegaMenu: OodMegaMenu,
  oodMegaMenuSection: OodMegaMenuSection,
  oodMegaMenuCard: OodMegaMenuCard,
  oodNavigationLink: OodNavigationLink,
  oodNavigationLinkGroup: OodNavigationLinkGroup,
  oodNavigationColumn: OodNavigationColumn,
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
