import SbEditable from "storyblok-react";
import React from "react";
import Components from "../components";
import CreateBloks from "../../utilities/createBloks";

/* The BelowContent component is referenced by the Interior Page and Support page types. */

const BelowContent = (props) => (
  <SbEditable content={props.blok}>
    {props.blok.belowContent != null &&
      Object.keys(props.blok.belowContent).length > 0 && (
        <div className="ood-interior-page__below-body">
          <CreateBloks blokSection={props.blok.belowContent} />
        </div>
      )}
  </SbEditable>
);

export default BelowContent;
