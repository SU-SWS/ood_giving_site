import React from 'react';
import SbEditable from 'storyblok-react';
import SbLink from '../../partials/sbLink';

const OodMegaMenuNavItem = (props) => (
  <SbEditable content={props.blok}>
    <li className="ood-mega-nav__item">
      <SbLink
        link={props.blok.link}
        classes={'ood-mega-nav__link'}
        externalClasses={'su-link--external'}
        activeClass={'ood-mega-nav__link--active'}
      >
        {props.blok.linkText}
      </SbLink>
    </li>
  </SbEditable>
);

export default OodMegaMenuNavItem;
