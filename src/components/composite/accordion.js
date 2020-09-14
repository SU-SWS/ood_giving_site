import React from 'react'
import RichTextField from '../richTextField'
import SbEditable from 'storyblok-react'
import Components from "../components";

const Accordion = (props) => {
  return (
    <SbEditable content={props.blok}>
      <div className={`su-accordion no-js ood-accordion`}>
        <h2 className={`ood-accordion__title`}>{props.blok.title}</h2>
        <button className="su-accordion__collapse-all su-button--secondary">Collapse all -</button>
        <button className="su-accordion__expand-all su-button--secondary">Expand all +</button>
        <ul className="su-accordion__list ood-accordion__list">
          {props.blok.accordionItems && props.blok.accordionItems.map((blok) => React.createElement(Components(blok.component), {
            key: blok._uid,
            blok: blok,
          }))}
        </ul>
      </div>
    </SbEditable>
  )
}

export default Accordion