import React from 'react'
import SbEditable from 'storyblok-react'
import Components from '../components.js'
import RichTextField from '../../utilities/richTextField'

const Section = (props) => {
  const Heading = props.blok.titleHeadingLevel;
  const titleStyleClassList = (titleStyleArray) => {
    return titleStyleArray.toString().replace(/,/g, " ");
  };

  const EdgeToEdgeContainer = (props) => (
    <SbEditable content={props.blok}>
      <div className="section__content">
        {props.blok.content && props.blok.content.map((blok) => React.createElement(Components(blok.component), {
          key: blok._uid,
          blok: blok
        }))}
      </div>
    </SbEditable>
  );

  const CenteredContainer = (props) => (
    <SbEditable content={props.blok}>
      <div className="section__content centered-container">
        {props.blok.content && props.blok.content.map((blok) => React.createElement(Components(blok.component), {
          key: blok._uid,
          blok: blok
        }))}
      </div>
    </SbEditable>
  );

  const FlexContainer = (props) => (
    <SbEditable content={props.blok}>
      <div className="section__content centered-container flex-container">
        <div className={`su-mx-auto ${props.blok.contentWidth}`}>
          {props.blok.content && props.blok.content.map((blok) => React.createElement(Components(blok.component), {
            key: blok._uid,
            blok: blok
          }))}
        </div>
      </div>
    </SbEditable>
  );

  return (
    <SbEditable content={props.blok}>
      <div className={`section su-bg-${props.blok.backgroundColor}
                     ${props.blok.spacingTop !== "none" ? `su-pt-${props.blok.spacingTop}` : ""}
                     ${props.blok.spacingBottom !== "none" ? `su-pb-${props.blok.spacingBottom}` : ""}`}
           id={props.blok.id}
      >
        {(props.blok.title || props.blok.introText) && (
          <div className={`centered-container section__header`}>
            {props.blok.title &&
              <Heading
                className={`section__title su-serif su-bold su-text-align-left su-mb-6
                          ${titleStyleClassList(props.blok.titleStyle)}`}>
                {props.blok.title}
              </Heading>
            }
            {props.blok.introText &&
              <div className="su-intro-text section__intro su-ml-none">
                <RichTextField data={props.blok.introText}/>
              </div>
            }
          </div>
        )}
        {props.blok.contentWidth === "edge-to-edge" &&
          <EdgeToEdgeContainer {...props}/>
        }
        {props.blok.contentWidth === "centered-container" &&
          <CenteredContainer {...props}/>
        }
        {(props.blok.contentWidth !== "edge-to-edge" && props.blok.contentWidth !== "centered-container") &&
          <FlexContainer {...props}/>
        }
      </div>
    </SbEditable>
  )
};

export default Section