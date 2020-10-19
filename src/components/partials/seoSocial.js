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
        {props.blok.seo.og_title &&
          <meta property="og:title"
              content={props.blok.seo.og_title} />
        }
        {props.blok.seo.og_description &&
          <meta property="og:description"
              content={props.blok.seo.og_description} />
        }
      </Helmet>
    </SbEditable>
  )
}

export default SeoSocial
