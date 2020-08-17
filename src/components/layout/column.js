import React from 'react'
import Components from '../components.js';
import SbEditable from 'storyblok-react'

const Column = (props) => (
  <SbEditable content={props.blok}>
      <div className={ "flex-md-" + props.blok.columnWidth }>
        {props.blok.content.map((blok) =>
          React.createElement(Components(blok.component), {key: blok._uid, blok: blok})
        )}
      </div>
  </SbEditable>
)

export default Column