import React from 'react'
// import Link from 'gatsby-link'
import SbEditable from 'storyblok-react'
import Components from "../components";
import RichTextField from "../richTextField";

const PageBuilder = (props) => (
  <SbEditable content={props.blok}>
    <div>
      {props.blok.pageBody && props.blok.pageBody.map((blok) => React.createElement(Components(blok.component), {
        key: blok._uid,
        blok: blok
      }))}
    </div>
  </SbEditable>
)

export default PageBuilder