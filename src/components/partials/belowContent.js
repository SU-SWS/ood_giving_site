import SbEditable from "storyblok-react";
import React from "react";
import Components from "../components"

/*
*
** The BelowContent component is referenced by the Interior Page and Support page types.
*
*/

const BelowContent = (props) => (
  <SbEditable content={props.blok}>
    {(props.blok.belowContent != null && Object.keys(props.blok.belowContent).length > 0) && (
      <section className="ood-interior-page__below-body">
        {props.blok.belowContent && props.blok.belowContent.map((blok) => React.createElement(Components(blok.component), {
          key: blok._uid,
          blok: blok
        }))}
      </section>
    )}
  </SbEditable>
);

export default BelowContent
