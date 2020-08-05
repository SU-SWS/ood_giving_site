import React from 'react'
import RichTextField from "../richTextField";

const IntroText = (props) => (
  <div class="su-intro-text">
    <RichTextField data={ props.blok.text ? props.blok.text : "" }></RichTextField>
  </div>
)

export default IntroText