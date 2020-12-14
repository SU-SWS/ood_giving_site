import React, { useState } from "react"
import SbEditable from 'storyblok-react'
import Components from "../components"
import Heading from "../partials/heading"
const AccContext = React.createContext(null)

const Accordion = (props) => {
  const [allAccOpened, setAllAccOpened] = useState(false);
  const expandAll = () => setAllAccOpened(true);
  const collapseAll = () => setAllAccOpened(false);

  return (
    <AccContext.Provider value={[allAccOpened, setAllAccOpened]}>
      <SbEditable content={props.blok}>
          <div className={`su-accordion
              ${props.blok.spacingTop !== "none" ? `su-pt-${props.blok.spacingTop}` : ""}
              ${props.blok.spacingBottom !== "none" ? `su-pb-${props.blok.spacingBottom}` : ""}`}
               {...props.blok.id ? {id : props.blok.id} : {}}
          >
            {props.blok.title &&
              <Heading defaultLevel={"h3"} level={props.blok.headingLevel} serif={true} classes={"ood-accordion__heading"}>{props.blok.title}</Heading>
            }
            {props.blok.accordionItems.length > 1 &&
              <>
              <button className="su-accordion__collapse-all su-button ood-cta__button--secondary" onClick={collapseAll}>Collapse all</button>
              <button className="su-accordion__expand-all su-button ood-cta__button--secondary" onClick={expandAll}>Expand all</button>
              </>
            }
            <ul className="su-accordion__list ood-accordion__list su-border-color-palo-alto-light">
              {props.blok.accordionItems && props.blok.accordionItems.map((blok) =>
                React.createElement(Components(blok.component), { key: blok._uid, blok: blok})
              )}
            </ul>
          </div>
      </SbEditable>
    </AccContext.Provider>
  )
}

export { Accordion, AccContext}
