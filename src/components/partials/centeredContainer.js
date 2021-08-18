import React from "react";

const CenteredContainer = (props) => {
  const Element = props.element ?? "div";

  return (
    <Element
      className={`
       ${props.centered_disabled ? "" : "centered-container"}
       ${props.flex ? "flex-container" : ""}
       ${props.srOnly ? "su-sr-only-element" : ""}
       ${props.classes ?? ""}
  `}
    >
      {props.children}
    </Element>
  );
};

export default CenteredContainer;
