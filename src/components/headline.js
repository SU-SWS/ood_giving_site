import React from 'react'
import RichTextField from "./richTextField";

const Headline = (props) => (
  <RichTextField data={ props.blok.headlineText ? props.blok.headlineText : "" }></RichTextField>
)

export default Headline