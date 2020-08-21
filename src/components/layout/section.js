import React from 'react'
import Components from '../components.js'
import SbEditable from 'storyblok-react'
import RichTextField from '../richTextField'

const Section = (props) => (
  <SbEditable content={props.blok}>
    <div id={props.blok.id} className={`section bg-${props.blok.backgroundColor} ${props.blok.spacing}`}>
      <div className={`centered-container section__header`}>
        {props.blok.titleHeadingLevel === 'h2' &&
          <h2 className={`section__title su-width-${props.blok.titleWidth} su-text-align-${props.blok.titleAlign} su-${props.blok.titleStyle} su-text-${props.blok.titleColor}`}>
            {props.blok.title}
          </h2>
        }
        {props.blok.titleHeadingLevel === 'h3' &&
          <h3 className={`section__title su-width-${props.blok.titleWidth} su-text-align-${props.blok.titleAlign} su-${props.blok.titleStyle} su-text-${props.blok.titleColor}`}>
            {props.blok.title}</h3>
        }
        {props.blok.titleHeadingLevel === 'h4' &&
          <h4 className={`section__title su-width-${props.blok.titleWidth} su-text-align-${props.blok.titleAlign} su-${props.blok.titleStyle} su-text-${props.blok.titleColor}`}>
            {props.blok.title}</h4>
        }
        {props.blok.titleHeadingLevel === 'h5' &&
          <h5 className={`section__title su-width-${props.blok.titleWidth} su-text-align-${props.blok.titleAlign} su-${props.blok.titleStyle} su-text-${props.blok.titleColor}`}>
            {props.blok.title}</h5>
        }
        {props.blok.titleHeadingLevel === 'h6' &&
          <h6 className={`section__title su-width-${props.blok.titleWidth} su-text-align-${props.blok.titleAlign} su-${props.blok.titleStyle} su-text-${props.blok.titleColor}`}>
            {props.blok.title}</h6>
        }
        {props.blok.introText &&
          <div className="su-intro-text section__intro">
            <RichTextField data={props.blok.introText ? props.blok.introText : ""}/>
          </div>
        }
      </div>
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