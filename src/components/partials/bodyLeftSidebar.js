import SbEditable from "storyblok-react"
import React from "react"
import CreateBloks from "../../utilities/createBloks"

/* The BodyLeftSidebar component is referenced by the Interior Page type.  */

const BodyLeftSidebar = (props) => (
  <SbEditable content={props.blok}>
    <aside className="ood-interior-page__body-sidebar flex-lg-4-of-12 flex-xl-3-of-12">
      <CreateBloks blokSection={props.blok.contentMenu} />
      <CreateBloks blokSection={props.blok.contactInfo} />
    </aside>
    <div className="ood-interior-page__body-content flex-lg-8-of-12">
      <CreateBloks blokSection={props.blok.pageContent} />
    </div>
  </SbEditable>
);

export default BodyLeftSidebar
