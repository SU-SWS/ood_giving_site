import React from 'react'
import RichTextField from '../../utilities/richTextField'
import SbEditable from 'storyblok-react'
import Components from "../components";

const Accordion = (props) => {
  return (
    <SbEditable content={props.blok}>
      <div className={`su-accordion no-js ood-accordion
           ${props.blok.spacingTop !== "none" ? `su-pt-${props.blok.spacingTop}` : ""}
           ${props.blok.spacingBottom !== "none" ? `su-pb-${props.blok.spacingBottom}` : ""}
      `}>
        {props.blok.title &&
          <h2 className={`ood-accordion__heading su-serif`}>{props.blok.title}</h2>
        }
        <button className="su-accordion__collapse-all su-button--secondary">Collapse all -</button>
        <button className="su-accordion__expand-all su-button--secondary">Expand all +</button>
        <ul className="su-accordion__list ood-accordion__list su-border-color-palo-alto-light">
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