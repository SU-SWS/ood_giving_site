import React from 'react'
import SbEditable from 'storyblok-react'
import RichTextField from '../../utilities/richTextField'
import CreateBloks from "../../utilities/createBloks"
import CenteredContainer from "../partials/centeredContainer"

const Section = (props) => {

  // Hide and don't return nothing.
  if (props.blok.hideSection === true) {
    return null;
  }

  const Heading = props.blok.headingLevel ? props.blok.headingLevel : "h2";

  const titleStyleClassList = (titleStyleArray) => {
    return titleStyleArray.toString().replace(/,/g, " ");
  };

  return (
    <SbEditable content={props.blok}>
      <div className={`section su-bg-${props.blok.backgroundColor}
                   ${props.blok.spacingTop !== "none" ? `su-pt-${props.blok.spacingTop}` : ""}
                   ${props.blok.spacingBottom !== "none" ? `su-pb-${props.blok.spacingBottom}` : ""}`}
           id={props.blok.id}
      >
        {(props.blok.title || props.blok.intro) && (
          <CenteredContainer flex={true} srOnly={props.blok.srOnlyHeader} classes={"section__header"}>
            {props.blok.title &&
              <Heading
                className={`section__title flex-lg-5-of-12 su-serif su-bold su-text-align-left
                            ${props.blok.titleSize}
                            su-before-bg-${props.blok.tabColor}
                            ${titleStyleClassList(props.blok.titleStyle)}`}>
                {props.blok.title}
              </Heading>
            }
            {props.blok.intro &&
              <div className={`intro-text flex-lg-7-of-12 section__intro su-mr-none`}><RichTextField data={props.blok.intro}/></div>
            }
          </CenteredContainer>
        )}
        {props.blok.contentWidth === "edge-to-edge" &&
          <div className="section__content">
            <CreateBloks blokSection={props.blok.content} />
          </div>
        }
        {props.blok.contentWidth === "centered-container" &&
          <CenteredContainer classes={"section__content"}>
            <CreateBloks blokSection={props.blok.content} />
          </CenteredContainer>
        }
        {(props.blok.contentWidth !== "edge-to-edge" && props.blok.contentWidth !== "centered-container") &&
          <CenteredContainer flex={true} classes={"section__content"}>
            <div className={`su-mx-auto ${props.blok.contentWidth}`}>
              <CreateBloks blokSection={props.blok.content} />
            </div>
          </CenteredContainer>
        }
      </div>
    </SbEditable>
  )
};

export default Section
