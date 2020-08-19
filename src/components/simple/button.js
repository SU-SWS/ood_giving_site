import React from 'react'
import Link from 'gatsby-link'
import SbEditable from 'storyblok-react'

const Button = (props) => (
  <SbEditable content={props.blok}>
    <a href={props.blok.buttonUrl ? props.blok.buttonUrl : "./"} class={props.blok.buttonStyle ? "su-link " + props.blok.buttonStyle : "su-link"}>{props.blok.buttonLabel ? props.blok.buttonLabel : "Link Here"}</a>
  </SbEditable>
)

export default Button