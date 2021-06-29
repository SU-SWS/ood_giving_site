import React from "react";
import SbEditable from "storyblok-react";
import RichTextField from "../../utilities/richTextField";
import CreateBloks from "../../utilities/createBloks";
import CenteredContainer from "../partials/centeredContainer";
import Heading from '../partials/heading';

const Section = (props) => {
  // Hide and don't return nothing.
  if (props.blok.hideSection === true) {
    return null;
  }

  let alignmentWrapper = "su-text-align-left";
  let alignmentTab = "";
  if (props.blok.isCenterAlign) {
    alignmentWrapper = "su-text-align-center su-w-full su-max-w-80";
    alignmentTab = "su-center-tab";
  }

  const titleStyleClassList = (titleStyleArray) => {
    return titleStyleArray.toString().replace(/,/g, " ");
  };

  return (
    <SbEditable content={props.blok}>
      <div
        className={`section su-bg-${props.blok.backgroundColor}
                   ${
                     props.blok.spacingTop !== "none"
                       ? `su-pt-${props.blok.spacingTop}`
                       : ""
                   }
                   ${
                     props.blok.spacingBottom !== "none"
                       ? `su-pb-${props.blok.spacingBottom}`
                       : ""
                   }
                  `}
        id={props.blok.id}
      >
        {(props.blok.title || props.blok.intro) && (
          <CenteredContainer
            centered_disabled={props.blok.disableWrapping}
            srOnly={props.blok.srOnlyHeader}
            classes={`section__header
              ${alignmentWrapper}
            `}
          >
            {props.blok.title && (
              <Heading
                classes={`section__title
                  ${props.blok.titleSize}
                  su-before-bg-${props.blok.tabColor}
                  ${titleStyleClassList(props.blok.titleStyle)}
                  ${alignmentTab}
                `}
                level={props.blok.headingLevel}
                defaultLevel="h2"
                weight={props.blok.isSansSemibold ? "semibold" : "bold"}
                serif={!props.blok.isSansSemibold}
              >
                {props.blok.title}
              </Heading>
            )}
            {props.blok.intro && (
              <div className={"intro-text section__intro su-ml-none"}>
                <RichTextField data={props.blok.intro} />
              </div>
            )}
          </CenteredContainer>
        )}
        {props.blok.contentWidth === "edge-to-edge" && (
          <div className="section__content">
            <CreateBloks blokSection={props.blok.content} />
          </div>
        )}
        {props.blok.contentWidth === "centered-container" && (
          <CenteredContainer classes={"section__content"}>
            <CreateBloks blokSection={props.blok.content} />
          </CenteredContainer>
        )}
        {props.blok.contentWidth !== "edge-to-edge" &&
          props.blok.contentWidth !== "centered-container" && (
            <CenteredContainer classes={"section__content"}>
              <div className={`su-mx-auto ${props.blok.contentWidth}`}>
                <CreateBloks blokSection={props.blok.content} />
              </div>
            </CenteredContainer>
          )}
      </div>
    </SbEditable>
  );
};

export default Section;
