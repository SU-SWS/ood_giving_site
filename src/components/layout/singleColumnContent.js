import React from "react";
import SbEditable from "storyblok-react";
import RichTextField from "../../utilities/richTextField";

const SingleColumnContent = (props) => (
  <SbEditable content={props.blok}>
    <div
      className={`ood-single-column-content
                   ${
                     props.blok.backgroundColor !== ""
                       ? `su-bg-${props.blok.backgroundColor}`
                       : ""
                   }
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
    >
      <div
        id={props.blok.id}
        className={`${
          props.blok.contentWidth !== "fit-container"
            ? "centered-container"
            : ""
        } flex-container`}
      >
        <div
          className={`ood-single-column-content__wrapper ${
            props.blok.contentWidth
          }
             ${
               props.blok.contentWidth === "fit-container"
                 ? "su-ml-none"
                 : "su-mx-auto"
             }`}
        >
          <RichTextField data={props.blok.content} />
        </div>
      </div>
    </div>
  </SbEditable>
);

export default SingleColumnContent;
