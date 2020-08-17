import RichTextField from "./richTextField"
import Page from './page'
import Grid from './grid'
import Teaser from './teaser'
import Feature from './feature'
import Card from './card'
import OodQuoteCard from './oodQuoteCard'
import OodQuoteSlider from './oodQuoteSlider'
import Column from './layout/column'
import Row from './layout/row'
import Hero from './hero'
import EventTeaser from './eventTeaser'
import Headline from './headline'
import FeaturedImage from './featuredImage'
import TestImage from './testImage'
import Section from './layout/section'
import IntroText from './typography/introText'
import OodMegaMenu from './navigation/oodMegaMenu'
import OodMegaMenuSection from './navigation/oodMegaMenuSection'
import OodMegaMenuCard from './navigation/oodMegaMenuCard'
import OodNavigationLink from './navigation/oodNavigationLink'
import OodNavigationLinkGroup from './navigation/oodNavigationLinkGroup'
import OodNavigationColumn from './navigation/oodNavigationColumn'
import ComponentNotFound from './component_not_found'
// Stanford identity elements
import GlobalFooter from './identity/globalFooter'
import GlobalHeader from './identity/globalHeader'
import Lockup from './identity/lockup'
// Navigation components
import NavItem from './navigation/navItem'
import OodEyebrowMenu from './navigation/oodEyebrowMenu'


const ComponentList = {
  page: Page,
  grid: Grid,
  teaser: Teaser,
  eventTeaser: EventTeaser,
  feature: Feature,
  card: Card,
  oodQuoteCard: OodQuoteCard,
  oodQuoteSlider: OodQuoteSlider,
  hero: Hero,
  richTextField: RichTextField,
  headline: Headline,
  row: Row,
  column: Column,
  introText: IntroText,
  oodMegaMenu: OodMegaMenu,
  oodMegaMenuSection: OodMegaMenuSection,
  oodMegaMenuCard: OodMegaMenuCard,
  oodNavigationLink: OodNavigationLink,
  oodNavigationLinkGroup: OodNavigationLinkGroup,
  oodNavigationColumn: OodNavigationColumn,
  globalFooter: GlobalFooter,
  globalHeader: GlobalHeader,
  lockup: Lockup,
  section: Section,
  featuredImage: FeaturedImage,
  testImage: TestImage,
  navItem: NavItem,
  oodEyebrowMenu: OodEyebrowMenu
}

const Components = (type) => {
  if (typeof ComponentList[type] === 'undefined') {
    return ComponentNotFound
  }
  return ComponentList[type]
}

export default Components
