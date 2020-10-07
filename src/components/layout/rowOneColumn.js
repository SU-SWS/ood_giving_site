import React from 'react'
import Components from '../components.js';
import SbEditable from 'storyblok-react'

const RowOneColumn = (props) => (
  <SbEditable content={props.blok}>
    <div className={`flex-container row--1-column su-mb-${props.blok.spacingBottom}`}>
      <div className={`flex-container su-mx-auto ${props.blok.rowWidth}`}>
        <div className={``}>
          {props.blok.columnContent.map((blok) => React.createElement(Components(blok.component), {
            key: blok._uid,
            blok: blok
          }))}
        </div>
      </div>
    </div>
  </SbEditable>
)

export default RowOneColumn
