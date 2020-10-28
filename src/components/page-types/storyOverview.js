import React from 'react'
import SbEditable from 'storyblok-react'
import Components from "../components"
import HeaderNoImage from '../partials/headerNoImage'
import BelowContent from '../partials/belowContent'
import IconCardSection from '../partials/iconCardSection'
import Footer from '../partials/footer'
import SeoSocial from '../partials/seoSocial'

const StoryOverview = (props) => {
  return (
    <>
      <SbEditable content={props.blok}>
        <SeoSocial {...props}/>
        {props.blok.localHeader && props.blok.localHeader.map((blok) => React.createElement(Components(blok.component), {
          key: blok._uid,
          blok: blok
        }))}
        <main id="main-content"
              className={`ood-interior-page ood-interior-page--no-image`}
        >
          <article className={`su-bg-white`}>
            <HeaderNoImage {...props}/>
            {props.blok.stories && props.blok.stories.map((blok) => React.createElement(Components(blok.component), {
              key: blok._uid,
              blok: blok
            }))}
            <BelowContent {...props}/>
            <footer className="ood-interior-page__main-footer">
              <IconCardSection {...props}/>
            </footer>
          </article>
        </main>
        <Footer {...props}/>
      </SbEditable>
    </>
  )
};

export default StoryOverview
