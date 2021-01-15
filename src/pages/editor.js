import React from 'react'
import Components from '../components/components.js'
import SbEditable from 'storyblok-react'
import config from '../../gatsby-config'
import Loader from 'react-loader-spinner'

const sbConfigs = config.plugins.filter((item) => {
  return item.resolve === 'gatsby-source-storyblok'
})
const sbConfig = sbConfigs.length > 0 ? sbConfigs[0] : {}

const loadStoryblokBridge = function(cb) {
  let script = document.createElement('script')
  script.type = 'text/javascript'
  script.src = `//app.storyblok.com/f/storyblok-latest.js`
  script.onload = cb
  document.getElementsByTagName('head')[0].appendChild(script)
}

const getParam = function(val) {
  var result = ''
  var tmp = []

  window.location.search
    .substr(1)
    .split('&')
    .forEach(function (item) {
      tmp = item.split('=')
      if (tmp[0] === val) {
        result = decodeURIComponent(tmp[1])
      }
    })

  return result
}

class StoryblokEntry extends React.Component {
  constructor(props) {
    super(props)
    this.state = {story: null, bad: false}
  }


  componentDidMount() {

	// Storyblok Preview API access key.
    const key = getParam("access_key")

    // Must have a storyblok key.
    if (isNaN(getParam("_storyblok"))) {
      this.setState({bad: true})
      return
    }

    // Must have the API Access key.
    if (key === '') {
      this.setState({bad: true})
      return
    }

    loadStoryblokBridge(() => {

      // Init with access token from url.
      window.storyblok.init({
        accessToken: key
      })

      this.initStoryblokEvents()
    })
  }

  loadStory() {
    window.storyblok.get({
      slug: window.storyblok.getParam('path'),
      version: 'draft',
      resolve_relations: sbConfig.options.resolveRelations || []
    }, (data) => {
      this.setState({story: data.story})
    })
  }

  initStoryblokEvents() {

    this.loadStory()

    let sb = window.storyblok

    sb.on(['change', 'published'], (payload) => {
      this.loadStory()
    })

    sb.on('input', (payload) => {
      if (this.state.story && payload.story.id === this.state.story.id) {
        payload.story.content = sb.addComments(payload.story.content, payload.story.id)
        sb.resolveRelations(payload.story, sbConfig.options.resolveRelations ||
          [
            'oodQuoteSlider.quotes',
            'globalFooterPicker.globalFooter',
            'localFooterPicker.localFooter',
            'localHeaderPicker.localHeader',
            'contentMenuPicker.contentMenu',
            'storyPicker.story',
          ],
          () => {
          this.setState({story: payload.story})
        })
      }
    })

    sb.pingEditor(() => {
      if (sb.inEditor) {
        sb.enterEditmode()
      }
    })
  }

  render() {

    if (this.state.bad == true) {
      return (
        <div className="centered-container">
          <h1>Error</h1>
          <p>You can only access this page through https://app.storyblok.com.</p>
        </div>
      )
    }

    if (this.state.story == null) {
      return (
        <div className="centered-container">
          <h1>Loading...</h1>
          <Loader type="Oval" color="#00BFFF" height={125} width={125} />
        </div>
      )
    }

    let content = this.state.story.content

    return (
      <SbEditable content={content}>
        <div>
          {React.createElement(Components(content.component), {key: content._uid, blok: content})}
        </div>
      </SbEditable>
    )
  }
}

export default StoryblokEntry
