import React from 'react'
import Components from '../components.js';
import SbEditable from 'storyblok-react'

const Row = (props) => (
  <SbEditable content={props.blok}>
    <div className="flex-container flex-container--row-gap">
      {props.blok.columns.map((blok) =>
        React.createElement(Components(blok.component), {key: blok._uid, blok: blok})
      )}
    </div>
  </SbEditable>
)

export default Row
