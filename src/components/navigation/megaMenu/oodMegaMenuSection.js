import React, {useState, useRef} from "react"
import SbEditable from "storyblok-react"
import CreateBloks from "../../../utilities/createBloks"
import UseOnClickOutside from "../../../hooks/useOnClickOutside"
import CenteredContainer from "../../partials/centeredContainer"
import FlexCell from "../../partials/flexCell"

const OodMegaMenuSection = (props) => {
  const [sectionOpened, setSectionOpened] = useState(false);
  const ref = useRef();

  const toggleSection = () => {
    setSectionOpened(!sectionOpened);
  }

  UseOnClickOutside(ref, () => setSectionOpened(false));

  return (
    <SbEditable content={props.blok}>
      <li className="ood-mega-nav__item--parent" ref={ref}>
        <button className="ood-mega-nav__trigger"
                aria-expanded={sectionOpened}
                onClick={toggleSection}>{props.blok.linkText}</button>
        <div className="ood-mega-nav__section su-bg-white" aria-hidden={!sectionOpened}>
          <CenteredContainer flex={true} classes={"su-py-3"}>
            <FlexCell lg={8} xxl={9} classes={"su-flex su-flex-col"}>
              <div className="flex-container">
                <CreateBloks blokSection={props.blok.linkGroups} />
              </div>
              <CreateBloks blokSection={props.blok.sectionCtaLink} />
            </FlexCell>
            <FlexCell lg={4} xxl={3}>
              <CreateBloks blokSection={props.blok.card} />
            </FlexCell>
          </CenteredContainer>
        </div>
      </li>
    </SbEditable>
  )
}

export default OodMegaMenuSection
