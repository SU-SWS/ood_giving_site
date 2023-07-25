import React, { useState, useRef } from 'react';
import SbEditable from 'storyblok-react';
import CreateBloks from '../../../utilities/createBloks';
import UseOnClickOutside from '../../../hooks/useOnClickOutside';
import CenteredContainer from '../../partials/centeredContainer';
import UseEscape from '../../../hooks/useEscape';
import FlexCell from '../../partials/flexCell';

const OodMegaMenuSection = (props) => {
  const [sectionOpened, setSectionOpened] = useState(false);
  const ref = useRef();

  const toggleSection = () => {
    setSectionOpened(!sectionOpened);
  };

  UseEscape(() => {
    const openParent = document.querySelector(
      ".ood-mega-nav__trigger[aria-expanded='true']"
    );
    const hamburger = document.querySelector('.ood-mega-nav__toggle');

    if (openParent && !hamburger) {
      setSectionOpened(false);
      openParent.focus();
    }
  });

  UseOnClickOutside(ref, () => setSectionOpened(false));

  return (
    <SbEditable content={props.blok}>
      <li className="ood-mega-nav__item--parent" ref={ref}>
        <button
          type="button"
          className="ood-mega-nav__trigger"
          aria-expanded={sectionOpened}
          onClick={toggleSection}
        >
          {props.blok.linkText}
        </button>
        <div className="ood-mega-nav__section" aria-hidden={!sectionOpened}>
          <CenteredContainer flex={true} classes={'su-pt-4 su-pb-5'}>
            <FlexCell lg={8} classes={'su-flex su-flex-col'}>
              <div className="flex-container ood-mega-nav__section-links">
                <CreateBloks blokSection={props.blok.linkGroups} />
              </div>
              <CreateBloks blokSection={props.blok.sectionCtaLink} />
            </FlexCell>
            <FlexCell lg={4}>
              <CreateBloks blokSection={props.blok.card} />
            </FlexCell>
          </CenteredContainer>
        </div>
      </li>
    </SbEditable>
  );
};

export default OodMegaMenuSection;
