import React, { useState, useContext, useRef } from "react"
import SbEditable from 'storyblok-react'
import RichTextField from '../../utilities/richTextField'
import Heading from "../partials/heading"
import { AccContext } from "./accordion"

const AccordionItem = (props) => {
  const buttonRef = useRef(null);
  const contentRef = useRef(null);
  const isExpanded = x => x.getAttribute('aria-expanded') === 'true';
  const [allAccOpened, setAllAccOpened] = useContext(AccContext);

  const toggleAcc = () => {
    if (isExpanded(buttonRef.current)) {
      buttonRef.current.setAttribute('aria-expanded', 'false');
      contentRef.current.setAttribute('aria-hidden', 'true');
    } else {
      buttonRef.current.setAttribute('aria-expanded', 'true');
      contentRef.current.setAttribute('aria-hidden', 'false');
    }
  }

  return (
    <SbEditable content={props.blok}>
      <li className="su-accordion__item ood-accordion__item su-border-color-palo-alto-light">
        <Heading defaultLevel={"h4"} level={props.blok.headingLevel} serif={true} classes={"su-accordion__title ood-accordion__title"}
                 {...props.blok.id ? {id : props.blok.id} : {}}
        >
          <button className="su-accordion__button ood-accordion__button" aria-expanded={allAccOpened} onClick={toggleAcc} ref={buttonRef}>{props.blok.title}</button>
        </Heading>
        <div className="su-accordion__content ood-accordion__content" aria-hidden={!allAccOpened} ref={contentRef}>
          <RichTextField data={props.blok.content}/>
        </div>
      </li>
    </SbEditable>
  )
}

export default AccordionItem
