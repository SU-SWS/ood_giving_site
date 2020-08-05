import React from 'react'
import Components from './components.js';
import Link from 'gatsby-link'
import SbEditable from 'storyblok-react'

const Section = (props) => (
  <SbEditable content={props.blok}>
    <div className="page-section" style={{
      backgroundColor: 'blue'
    }} >
    </div>
  </SbEditable>
)

export default Section