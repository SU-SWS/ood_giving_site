import React from 'react'
import SbEditable from 'storyblok-react'
import RichTextField from '../richTextField'

const SimpleWysiwyg = (props) => (
  <SbEditable content={props.blok}>
    <div className={`ood-single-column-content`}>
      <RichTextField data={props.blok.content}/>
    </div>
  </SbEditable>
)

export default SimpleWysiwyg