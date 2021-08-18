import React from "react";
import SbEditable from "storyblok-react";
import SbLink from "../partials/sbLink";

const NavItem = (props) => (
  <SbEditable content={props.blok}>
    <li>
      <SbLink
        link={props.blok.link}
        activeClass={"active"}
        externalClasses={"su-link--external"}
      >
        {props.blok.linkTextLabel}
      </SbLink>
    </li>
  </SbEditable>
);

export default NavItem;
