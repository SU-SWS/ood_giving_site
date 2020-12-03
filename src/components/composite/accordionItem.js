import React, { useState } from "react"
import SbEditable from 'storyblok-react'
import RichTextField from '../../utilities/richTextField'
import Heading from "../partials/heading"

const AccordionItem = (props) => {
  const [accOpened, setAccOpened] = useState(false);

  const toggleAcc = () => {
    setAccOpened(!accOpened);
  }

  return (
    <SbEditable content={props.blok}>
      <li className="su-accordion__item ood-accordion__item su-border-color-palo-alto-light">
        <Heading defaultLevel={"h4"} level={props.blok.headingLevel} serif={true} classes={"su-accordion__title ood-accordion__title"}
                 {...props.blok.id ? {id : props.blok.id} : {}}
        >
          <button className="su-accordion__button ood-accordion__button" aria-expanded={accOpened} onClick={toggleAcc}>{props.blok.title}</button>
        </Heading>
        <div className="su-accordion__content ood-accordion__content" aria-hidden={!accOpened}>
          <RichTextField data={props.blok.content}/>
        </div>
      </li>
    </SbEditable>
  )
}

export default AccordionItem
