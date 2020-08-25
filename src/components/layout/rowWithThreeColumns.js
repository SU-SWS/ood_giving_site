import React from 'react'
import Components from '../components.js';
import SbEditable from 'storyblok-react'

const RowWithThreeColumns = (props) => (
  <SbEditable content={props.blok}>
    <div className={`flex-container row--3-columns align-items-${props.blok.contentAlignment} su-mb-${props.blok.bottomSpacing}`}>
      <div className="flex-md-4-of-12">
        {props.blok.columnOneContent.map((blok) =>
          React.createElement(Components(blok.component), {key: blok._uid, blok: blok})
        )}
      </div>
      <div className="flex-md-4-of-12">
        {props.blok.columnTwoContent.map((blok) =>
          React.createElement(Components(blok.component), {key: blok._uid, blok: blok})
        )}
      </div>
      <div className="flex-md-4-of-12">
        {props.blok.columnThreeContent.map((blok) =>
          React.createElement(Components(blok.component), {key: blok._uid, blok: blok})
        )}
      </div>
    </div>
  </SbEditable>
)

export default RowWithThreeColumns
