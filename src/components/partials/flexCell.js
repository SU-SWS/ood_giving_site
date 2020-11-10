import React from "react"

const FlexCell = (props) => {
  const Element = props.element ? props.element : "div";

  return (
    <Element className={`
       ${props.xs ? `flex-xs-${props.xs}-of-12` : ""}
       ${props.sm ? `flex-sm-${props.sm}-of-12` : ""}
       ${props.md ? `flex-md-${props.md}-of-12` : ""}
       ${props.lg ? `flex-lg-${props.lg}-of-12` : ""}
       ${props.xl ? `flex-xl-${props.xl}-of-12` : ""}
       ${props.xxl ? `flex-2xl-${props.xxl}-of-12` : ""}
       ${props.classes ? props.classes : ""}
  `}>
      {props.children}
    </Element>
  );
}

export default FlexCell
