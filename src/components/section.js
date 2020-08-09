import React from 'react'
import Components from './components.js';
import SbEditable from 'storyblok-react'

const Section = (props) => (
  <SbEditable content={props.blok}>
    <div className={"section bg-" + props.blok.backgroundColor + " " + props.blok.spacing + " text-" + props.blok.textColor}>
      <div className="centered-container">
        <h2 className="section__title" >{props.blok.title}</h2>
        {props.blok.content && props.blok.content.map((blok) => React.createElement(Components(blok.component), {
          key: blok._uid,
          blok: blok
        }))}
      </div>
    </div>
  </SbEditable>
)

export default Section