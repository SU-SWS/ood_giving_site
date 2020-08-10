import RichTextField from "./richTextField"
import Page from './page'
import Grid from './grid'
import Teaser from './teaser'
import Feature from './feature'
import Card from './card'
import Column from './column'
import Row from './row'
import Hero from './hero'
import EventTeaser from './eventTeaser'
import Headline from './headline'
import FeaturedImage from './featuredImage'
import Section from './section'
import IntroText from './typography/introText'
import ComponentNotFound from './component_not_found'
// Stanford identity elements
import GlobalFooter from './identity/globalFooter'
import GlobalHeader from './identity/globalHeader'
import Lockup from './identity/lockup'


const ComponentList = {
  page: Page,
  grid: Grid,
  teaser: Teaser,
  eventTeaser: EventTeaser,
  feature: Feature,
  card: Card,
  hero: Hero,
  richTextField: RichTextField,
  headline: Headline,
  row: Row,
  column: Column,
  introText: IntroText,
  globalFooter: GlobalFooter,
  globalHeader: GlobalHeader,
  lockup: Lockup,
  section: Section,
  featuredImage: FeaturedImage
}

const Components = (type) => {
  if (typeof ComponentList[type] === 'undefined') {
    return ComponentNotFound
  }
  return ComponentList[type]
}

export default Components
