import React from "react"

const CenteredContainer = (props) => (
  <div className={`centered-container
       ${props.flex ? "flex-container" : ""}
       ${props.srOnly ? "su-sr-only-element" : ""}
       ${props.classes ? props.classes : ""}
  `}>
    {props.children}
  </div>
);

export default CenteredContainer
