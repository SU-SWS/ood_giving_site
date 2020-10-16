import React from 'react'
import Components from '../components.js'
import SbEditable from 'storyblok-react'

/*
** The Curated Stories component is allowed inside any section area.
* The purpose of this component is to provide a hand-curated featured area of stories.
* Users can select stories with the picker or manually create a story card to link to an external story.
* (See page-types/story/storyPicker.js)
*/

const CuratedStories = (props) => (
  <SbEditable content={props.blok}>
    <div className={`ood-curated-stories`}>
      {(props.blok.featuredStories != null && Object.keys(props.blok.featuredStories).length > 0) && (
        <div className={`flex-container ood-curated-stories__featured su-mb-3`}>
          <div className={`flex-xl-10-of-12 su-mx-auto`}>
            {props.blok.featuredStories.map((blok) =>
              React.createElement(Components(blok.component), {key: blok._uid, blok: blok})
            )}
          </div>
        </div>
      )}
      {(props.blok.otherStories != null && Object.keys(props.blok.otherStories).length > 0) && (
        <div className={`flex-container ood-curated-stories__other ${props.blok.layout === "2"? "flex-lg-10-of-12 flex-xl-8-of-12 " : ""}su-flex-${props.blok.layout}-col su-mx-auto`}>
            {props.blok.otherStories.map((blok) =>
              React.createElement(Components(blok.component), {key: blok._uid, blok: blok})
            )}
        </div>
      )}
      {props.blok.ctaLink && props.blok.ctaLink.map((blok) => React.createElement(Components(blok.component), {
        key: blok._uid,
        blok: blok
      }))}
    </div>
  </SbEditable>
);

export default CuratedStories
