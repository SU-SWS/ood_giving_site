import React from 'react'
import Components from '../components.js';
import SbEditable from 'storyblok-react'

const RowTwoColumns = (props) => (
  <SbEditable content={props.blok}>
    <div className={`flex-container row--2-columns su-align-items-${props.blok.contentAlignment} su-mb-${props.blok.spacingBottom}`}>
      <div className={`${props.blok.oneColumnMd === true ? "flex-lg-6-of-12": "flex-md-6-of-12"}`}>
        {props.blok.columnOneContent.map((blok) =>
          React.createElement(Components(blok.component), {key: blok._uid, blok: blok})
        )}
      </div>
      <div className={`${props.blok.oneColumnMd === true ? "flex-lg-6-of-12": "flex-md-6-of-12"}`}>
        {props.blok.columnTwoContent.map((blok) =>
          React.createElement(Components(blok.component), {key: blok._uid, blok: blok})
        )}
      </div>
    </div>
  </SbEditable>
)

export default RowTwoColumns
