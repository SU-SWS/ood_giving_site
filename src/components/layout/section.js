import React from 'react'
import Components from '../components.js'
import SbEditable from 'storyblok-react'
import RichTextField from '../richTextField'

const Section = (props) => {
  const Heading = props.blok.titleHeadingLevel;
  const titleStyleClassList = (titleStyleArray) => {
    return titleStyleArray.toString().replace(/,/g, " ");
  };

  return (
  <SbEditable content={props.blok}>
    <div id={props.blok.id} className={`section su-bg-${props.blok.backgroundColor} ${props.blok.spacing}`}>
      {(props.blok.title || props.blok.introText) && (
        <div className={`centered-container section__header`}>
          {props.blok.title &&
            <Heading
              className={`section__title su-serif su-bold su-text-align-left
                        ${titleStyleClassList(props.blok.titleStyle)}`}>
              {props.blok.title}
            </Heading>
          }
          {props.blok.introText &&
            <div className="su-intro-text section__intro">
              <RichTextField data={props.blok.introText}/>
            </div>
          }
        </div>
      )}
      <div className={props.blok.contentWidth}>
          {props.blok.content && props.blok.content.map((blok) => React.createElement(Components(blok.component), {
            key: blok._uid,
            blok: blok
          }))}
      </div>
    </div>
  </SbEditable>
)}

export default Section