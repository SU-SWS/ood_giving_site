import React from 'react'
import SbEditable from 'storyblok-react'
import RichTextField from '../../utilities/richTextField'
import CreateBloks from "../../utilities/createBloks"

const Section = (props) => {

  // Hide and don't return nothing.
  if (props.blok.hideSection === true) {
    return null;
  }

  const Heading = props.blok.headingLevel ? props.blok.headingLevel : "h2";
  const titleStyleClassList = (titleStyleArray) => {
    return titleStyleArray.toString().replace(/,/g, " ");
  };

  const EdgeToEdgeContainer = (props) => (
    <SbEditable content={props.blok}>
      <div className="section__content">
        <CreateBloks blokSection={props.blok.content} />
      </div>
    </SbEditable>
  );

  const CenteredContainer = (props) => (
    <SbEditable content={props.blok}>
      <div className="section__content centered-container">
        <CreateBloks blokSection={props.blok.content} />
      </div>
    </SbEditable>
  );

  const FlexContainer = (props) => (
    <SbEditable content={props.blok}>
      <div className="section__content centered-container flex-container">
        <div className={`su-mx-auto ${props.blok.contentWidth}`}>
          <CreateBloks blokSection={props.blok.content} />
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
          {(props.blok.title || props.blok.intro) && (
            <div
              className={`centered-container flex-container section__header su-mb-3
              ${props.blok.srOnlyHeader === true ? "su-sr-only-element" : ""}`}>
              {props.blok.title &&
                <Heading
                  className={`section__title flex-lg-5-of-12 su-serif su-bold su-text-align-left su-mb-4
                              ${props.blok.titleSize}
                              su-before-bg-${props.blok.tabColor}
                              ${titleStyleClassList(props.blok.titleStyle)}`}>
                  {props.blok.title}
                </Heading>
              }
              {props.blok.intro &&
                <div className={`intro-text flex-lg-7-of-12 section__intro su-mr-none`}><RichTextField data={props.blok.intro}/></div>
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
