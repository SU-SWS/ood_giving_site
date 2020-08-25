import React from 'react'
import Components from '../components.js';
import SbEditable from 'storyblok-react'

const ColumnGrid = (props) => (
    <SbEditable content={props.blok}>
      <div className={`flex-container column-grid`}>
        <div className="flex-md-4-of-12 column-grid__column">
          {props.blok.columnOneContent.map((blok) =>
            React.createElement(Components(blok.component), {key: blok._uid, blok: blok})
          )}
        </div>
        <div className="flex-md-4-of-12 column-grid__column">
          {props.blok.columnTwoContent.map((blok) =>
            React.createElement(Components(blok.component), {key: blok._uid, blok: blok})
          )}
        </div>
        <div className="flex-md-4-of-12 column-grid__column">
          {props.blok.columnThreeContent.map((blok) =>
            React.createElement(Components(blok.component), {key: blok._uid, blok: blok})
          )}
        </div>
      </div>
    </SbEditable>
)

export default ColumnGrid
