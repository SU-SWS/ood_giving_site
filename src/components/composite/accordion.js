import React from 'react'
import SbEditable from 'storyblok-react'
import Components from "../components";

const Accordion = (props) => {
  const Heading = props.blok.headingLevel ? props.blok.headingLevel : "h3";

  return (
    <SbEditable content={props.blok}>
      <div className={`su-accordion ood-accordion
           ${props.blok.spacingTop !== "none" ? `su-pt-${props.blok.spacingTop}` : ""}
           ${props.blok.spacingBottom !== "none" ? `su-pb-${props.blok.spacingBottom}` : ""}
      `}>
        {props.blok.title &&
          <Heading className={`ood-accordion__heading su-serif`}>{props.blok.title}</Heading>
        }
        <button className="su-accordion__collapse-all su-button ood-cta__button--secondary">Collapse all -</button>
        <button className="su-accordion__expand-all su-button ood-cta__button--secondary">Expand all +</button>
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
