import React from 'react'
import Components from './components.js'
import SbEditable from 'storyblok-react'

const FilteringGrid = (props) => (
  <SbEditable content={props.blok}>
      <div className={`centered-container section__header filtering-grid`}>
        <input type="radio" id="athletics" name="color"/>
        <label htmlFor="athletics">Athletics</label>
        <input type="radio" id="green" name="color"/>
        <label htmlFor="green">Reset</label>
        <div>
          {props.blok.cards && props.blok.cards.map((blok) => React.createElement(Components(blok.component), {
            key: blok._uid,
            blok: blok
          }))}
       </div>
      </div>
  </SbEditable>
)

export default FilteringGrid