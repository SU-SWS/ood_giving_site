import React from "react";
import SbEditable from "storyblok-react";
import Components from "../components";

// The footer component is referenced and used in all page-type components.

const Footer = (props) => (
  <SbEditable content={props.blok}>
    <footer>
      {props.blok.localFooter && props.blok.localFooter.map((blok) => React.createElement(Components(blok.component), {
        key: blok._uid,
        blok: blok
      }))}
      {props.blok.globalFooter && props.blok.globalFooter.map((blok) => React.createElement(Components(blok.component), {
        key: blok._uid,
        blok: blok
      }))}
    </footer>
  </SbEditable>
)

export default Footer
