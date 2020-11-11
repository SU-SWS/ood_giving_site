import React, {useState, useRef} from "react"
import SbEditable from "storyblok-react"
import CreateBloks from "../../../utilities/createBloks"
import UseOnClickOutside from "../../../hooks/useOnClickOutside"
import CenteredContainer from "../../partials/centeredContainer"
import UseEscape from "../../../hooks/useEscape"

const OodMegaMenuSection = (props) => {
  const [sectionOpened, setSectionOpened] = useState(false);
  const ref = useRef();

  const toggleSection = () => {
    setSectionOpened(!sectionOpened);
  }

  UseEscape(() => setSectionOpened(false));
  UseOnClickOutside(ref, () => setSectionOpened(false));

  return (
    <SbEditable content={props.blok}>
      <li className="ood-mega-nav__item--parent" ref={ref}>
        <button className="ood-mega-nav__trigger"
                aria-expanded={sectionOpened}
                onClick={toggleSection}>{props.blok.linkText}</button>
        <div className="ood-mega-nav__section su-bg-white" aria-hidden={!sectionOpened}>
          <CenteredContainer flex={true} classes={"su-py-3"}>
            <div className="flex-lg-8-of-12 flex-2xl-9-of-12 su-flex su-flex-col">
              <div className="flex-container">
                <CreateBloks blokSection={props.blok.linkGroups} />
              </div>
              <CreateBloks blokSection={props.blok.sectionCtaLink} />
            </div>
            <div className="flex-lg-4-of-12 flex-2xl-3-of-12">
              <CreateBloks blokSection={props.blok.card} />
            </div>
          </CenteredContainer>
        </div>
      </li>
    </SbEditable>
  )
}

export default OodMegaMenuSection
