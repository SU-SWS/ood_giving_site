import React from 'react'
import Components from '../components.js';
import SbEditable from 'storyblok-react'

const Section = (props) => (
  <SbEditable content={props.blok}>

    <div id={props.blok.id} className={"section bg-" + props.blok.backgroundColor + " " + props.blok.spacing + " text-" + props.blok.textColor}>
      {props.blok.titleHeadingLevel === 'h2' &&
        <h2 className="section__title" >{props.blok.title}</h2>
      }
      {props.blok.titleHeadingLevel === 'h3' &&
        <h3 className="section__title" >{props.blok.title}</h3>
      }
      {props.blok.titleHeadingLevel === 'h4' &&
        <h4 className="section__title" >{props.blok.title}</h4>
      }
      <div className={props.blok.contentWidth}>

          {props.blok.content && props.blok.content.map((blok) => React.createElement(Components(blok.component), {
            key: blok._uid,
            blok: blok
          }))}

      </div>
    </div>
  </SbEditable>
)

export default Section