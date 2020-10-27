import React, {useState, useRef} from "react"
import SbEditable from "storyblok-react"
import CreateBloks from "../../../utilities/createBloks"
import UseKeyPress from "../../../hooks/useKeyPress"
import UseOnClickOutside from "../../../hooks/useOnClickOutside"

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
          <div className="centered-container flex-container su-py-3">
            <div className="flex-lg-8-of-12 flex-2xl-9-of-12 su-flex su-flex-col">
              <div className="flex-container">
                <CreateBloks blokSection={props.blok.linkGroups} />
              </div>
              <CreateBloks blokSection={props.blok.sectionCtaLink} />
            </div>
            <div className="flex-lg-4-of-12 flex-2xl-3-of-12">
              <CreateBloks blokSection={props.blok.card} />
            </div>
          </div>
        </div>
      </li>
    </SbEditable>
  )
}

export default OodMegaMenuSection
