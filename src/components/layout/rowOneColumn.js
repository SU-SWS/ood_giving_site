import React from "react";
import SbEditable from "storyblok-react";
import CreateBloks from "../../utilities/createBloks";

const RowOneColumn = (props) => (
  <SbEditable content={props.blok}>
    <div
      className={`flex-container row--1-column su-mb-${props.blok.spacingBottom}`}
    >
      <div className={`${props.blok.align} ${props.blok.rowWidth}`}>
        <CreateBloks blokSection={props.blok.columnContent} />
      </div>
    </div>
  </SbEditable>
);

export default RowOneColumn;
