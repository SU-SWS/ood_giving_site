import SbEditable from "storyblok-react";
import React from "react";
import Components from "../components";

const BodyLeftSidebar = (props) => (
  <SbEditable content={props.blok}>
    <aside className="ood-interior-page__body-sidebar flex-lg-4-of-12 flex-xl-3-of-12">
      {props.blok.contentMenu && props.blok.contentMenu.map((blok) => React.createElement(Components(blok.component), {
        key: blok._uid,
        blok: blok
      }))}
      {props.blok.contactInfo && props.blok.contactInfo.map((blok) => React.createElement(Components(blok.component), {
        key: blok._uid,
        blok: blok
      }))}
    </aside>
    <div className="ood-interior-page__body-content flex-lg-8-of-12">
      {props.blok.pageContent && props.blok.pageContent.map((blok) => React.createElement(Components(blok.component), {
        key: blok._uid,
        blok: blok
      }))}
    </div>
  </SbEditable>
);

export default BodyLeftSidebar