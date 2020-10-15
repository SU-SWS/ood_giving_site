import React from 'react'
import { Helmet } from "react-helmet"
import SbEditable from "storyblok-react"

const SeoSocial = (props) => {
  return (
    <SbEditable content={props.blok}>
      <Helmet>
        <title>{`${props.blok.title} | Giving to Stanford`}</title>
        {props.blok.seo.description &&
          <meta name="description"
              content={props.blok.seo.description} />
        }
      </Helmet>
    </SbEditable>
  )
}

export default SeoSocial
