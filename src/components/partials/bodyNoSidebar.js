import SbEditable from "storyblok-react";
import React from "react";
import Components from "../components";

const BodyNoSidebar = (props) => (
  <SbEditable content={props.blok}>
    <div className="ood-interior-page__body-content flex-lg-8-of-12 flex-xl-7-of-12 flex-2xl-6-of-12 su-mx-auto">
      {props.blok.pageContent && props.blok.pageContent.map((blok) => React.createElement(Components(blok.component), {
        key: blok._uid,
        blok: blok
      }))}
    </div>
  </SbEditable>
);

export default BodyNoSidebar