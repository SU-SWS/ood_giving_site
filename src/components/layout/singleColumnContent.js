import React from 'react'
import SbEditable from 'storyblok-react'
import RichTextField from '../richTextField'

const SingleColumnContent = (props) => (
  <SbEditable content={props.blok}>
    <div className={`ood-single-column-content su-bg-${props.blok.backgroundColor}`}>
      <div id={props.blok.id} className={`centered-container flex-container}`}>
        <div class={`ood-single-column-content__wrapper ${props.blok.contentWidth}`}>
          <RichTextField data={props.blok.content}/>
        </div>
      </div>
    </div>
  </SbEditable>
)

export default SingleColumnContent