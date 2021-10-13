import React from 'react';
import SbEditable from 'storyblok-react';
import CreateBloks from '../../utilities/createBloks';

/*
 ** The footer component is referenced and used in all page-type components.
 ** It incorporates the local footer and global footer, based on page settings.
 */

const Footer = (props) => (
  <SbEditable content={props.blok}>
    <footer>
      <CreateBloks blokSection={props.blok.localFooter} />
      <CreateBloks blokSection={props.blok.globalFooter} />
    </footer>
  </SbEditable>
);

export default Footer;
