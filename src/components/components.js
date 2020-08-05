import Page from './page'
import Grid from './grid'
import Teaser from './teaser'
import Feature from './feature'
import EventTeaser from './eventTeaser'
import Headline from './headline'
import Section from './section'
import IntroText from './typography/introText'
import ComponentNotFound from './component_not_found'
// Stanford identity elements
import GlobalFooter from './identity/globalFooter'
import RichTextField from "./richTextField";

const ComponentList = {
  page: Page,
  grid: Grid,
  teaser: Teaser,
  eventTeaser: EventTeaser,
  feature: Feature,
  richTextField: RichTextField,
  headline: Headline,
  introText: IntroText,
  globalFooter: GlobalFooter,
  section: Section
}

const Components = (type) => {
  if (typeof ComponentList[type] === 'undefined') {
    return ComponentNotFound
  }
  return ComponentList[type]
}

export default Components
