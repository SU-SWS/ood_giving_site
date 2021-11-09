import SbEditable from 'storyblok-react';
import React from 'react';
import CreateBloks from '../../utilities/createBloks';
import UseWindowSize from '../../hooks/useWindowSize';
import FlexCell from './flexCell';
import { config } from '../../utilities/config';

/* The BodyLeftSidebar component is referenced by the Interior Page type.  */

const BodyLeftSidebar = (props) => {
  let windowSize = UseWindowSize();

  return (
    <SbEditable content={props.blok}>
      <FlexCell
        element={'aside'}
        lg={4}
        xl={3}
        classes={'ood-interior-page__body-sidebar'}
      >
        {windowSize.width >= config.breakpoint.lg && (
          <>
            <a href="#body-content" className="su-skiplinks">
              Skip past section menu to page content
            </a>
            <CreateBloks blokSection={props.blok.contentMenu} />
          </>
        )}
        <CreateBloks blokSection={props.blok.contactInfo} />
      </FlexCell>
      <FlexCell
        lg={8}
        classes={'ood-interior-page__body-content'}
        id={'body-content'}
      >
        <CreateBloks blokSection={props.blok.pageContent} />
      </FlexCell>
    </SbEditable>
  );
};

export default BodyLeftSidebar;
