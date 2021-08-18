import SbEditable from "storyblok-react";
import React from "react";
import CreateBloks from "../../utilities/createBloks";
import FlexCell from "./flexCell";

const BodyNoSidebar = (props) => (
  <SbEditable content={props.blok}>
    <FlexCell
      lg={10}
      xl={8}
      classes={"ood-interior-page__body-content su-mx-auto"}
    >
      <CreateBloks blokSection={props.blok.pageContent} />
    </FlexCell>
  </SbEditable>
);

export default BodyNoSidebar;
