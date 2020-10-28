import SbEditable from "storyblok-react"
import React from "react"
import CreateBloks from "../../utilities/createBloks"

const BodyNoSidebar = (props) => (
  <SbEditable content={props.blok}>
    <div className="ood-interior-page__body-content flex-lg-10-of-12 flex-xl-8-of-12 su-mx-auto">
      <CreateBloks blokSection={props.blok.pageContent} />
    </div>
  </SbEditable>
);

export default BodyNoSidebar
