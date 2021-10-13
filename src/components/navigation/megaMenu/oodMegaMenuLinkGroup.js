import React from 'react';
import SbEditable from 'storyblok-react';
import CreateBloks from '../../../utilities/createBloks';
import FlexCell from '../../partials/flexCell';
import Heading from '../../partials/heading';

const OodMegaMenuLinkGroup = (props) => (
  <SbEditable content={props.blok}>
    <FlexCell md={4} classes={'ood-mega-nav__link-group'}>
      {props.blok.heading && (
        <Heading
          weight={'bold'}
          classes={`ood-mega-nav__link-group-heading su-uppercase`}
        >
          {props.blok.heading}
        </Heading>
      )}
      {props.blok.links != '' && (
        <ul className="ood-mega-nav__menu-lv2 su-list-none">
          <CreateBloks blokSection={props.blok.links} />
        </ul>
      )}
    </FlexCell>
  </SbEditable>
);

export default OodMegaMenuLinkGroup;
