import React from "react"

const CenteredContainer = (props) => {
  const Element = props.element ? props.element : "div";

  return (
    <Element className={`centered-container
       ${props.flex ? "flex-container" : ""}
       ${props.srOnly ? "su-sr-only-element" : ""}
       ${props.classes ? props.classes : ""}
  `}>
      {props.children}
    </Element>
  );
}

export default CenteredContainer
