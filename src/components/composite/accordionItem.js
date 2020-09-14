import React from 'react'
import SbEditable from 'storyblok-react'
import RichTextField from '../richTextField'
import Components from "../components";

const AccordionItem = (props) => {
  const Heading = props.blok.titleHeadingLevel;

  return (
    <SbEditable content={props.blok}>
      <li className="su-accordion__item">
        <Heading className="su-accordion__title">
          <button className="su-accordion__button" aria-expanded="false">{props.blok.title}</button>
        </Heading>
        <div className="su-accordion__content">
          <RichTextField data={props.blok.content}/>
        </div>
      </li>
    </SbEditable>
  )
}

export default AccordionItem