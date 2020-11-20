import SbEditable from "storyblok-react"
import React from "react"
import CreateBloks from "../../utilities/createBloks"
import UseWindowSize from "../../hooks/useWindowSize"
import FlexCell from "./flexCell"

/* The BodyLeftSidebar component is referenced by the Interior Page type.  */

const BodyLeftSidebar = (props) => {
  let windowSize = UseWindowSize();

  return (
    <SbEditable content={props.blok}>
      <FlexCell lg={8} classes={"ood-interior-page__body-content"} id={"body-content"}>
        <CreateBloks blokSection={props.blok.pageContent} />
      </FlexCell>
      <FlexCell element={"aside"} lg={4} xl={3} classes={"ood-interior-page__body-sidebar"}>
        {windowSize.width > 991 &&
          <CreateBloks blokSection={props.blok.contentMenu}/>
        }
        <CreateBloks blokSection={props.blok.contactInfo} />
      </FlexCell>
    </SbEditable>
  );
}

export default BodyLeftSidebar
