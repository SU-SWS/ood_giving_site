import React from 'react'
import SbEditable from 'storyblok-react'
import RichTextField from '../richTextField'

const SingleColumnContent = (props) => (
  <SbEditable content={props.blok}>
    <div className={`ood-single-column-content su-bg-${props.blok.backgroundColor}
                   ${props.blok.spacingTop !== "none" ? `su-pt-${props.blok.spacingTop}` : ""}
                   ${props.blok.spacingBottom !== "none" ? `su-pb-${props.blok.spacingBottom}` : ""}
    `}>
      <div id={props.blok.id} className={`centered-container flex-container}`}>
        <div class={`ood-single-column-content__wrapper ${props.blok.contentWidth}`}>
          <RichTextField data={props.blok.content}/>
        </div>
      </div>
    </div>
  </SbEditable>
)

export default SingleColumnContent