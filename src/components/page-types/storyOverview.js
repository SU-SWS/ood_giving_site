import React from 'react'
import SbEditable from 'storyblok-react'
import HeaderNoImage from '../partials/headerNoImage'
import BelowContent from '../partials/belowContent'
import IconCardSection from '../partials/iconCardSection'
import Footer from '../partials/footer'
import SeoSocial from '../partials/seoSocial'
import CreateBloks from "../../utilities/createBloks"

const StoryOverview = (props) => {
  return (
    <SbEditable content={props.blok}>
      <SeoSocial {...props}/>
      <CreateBloks blokSection={props.blok.localHeader} />
      <main id="main-content" className={`ood-interior-page ood-interior-page--no-image`}>
        <article className={`su-bg-white`}>
          <HeaderNoImage {...props}/>
          <CreateBloks blokSection={props.blok.stories} />
          <BelowContent {...props}/>
          <footer className={`ood-interior-page__main-footer`}>
            <IconCardSection {...props}/>
          </footer>
        </article>
      </main>
      <Footer {...props}/>
    </SbEditable>
  )
};

export default StoryOverview
