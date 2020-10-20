import React from 'react'
import { Helmet } from "react-helmet"
import SbEditable from "storyblok-react"
import UseSiteMetadata from "../../hooks/useSiteMetadata"

const SeoSocial = (props) => {
  const { title } = UseSiteMetadata();

  return (
    <SbEditable content={props.blok}>
      <Helmet>
        <title>{`${props.blok.title} | ${title}`}</title>
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
        {(props.blok.seo.og_image || props.blok.seo.twitter_image || props.blok.image || props.blok.heroImage || props.blok.cardImage) &&
          <meta property="og:image"
              content={props.blok.seo.og_image} />
        }
        {props.blok.seo.twitter_title &&
          <meta name="twitter:title"
              content={props.blok.seo.twitter_title} />
        }
        {props.blok.seo.twitter_description &&
          <meta name="twitter:description"
              content={props.blok.seo.twitter_description} />
        }
        {(props.blok.seo.twitter_image || props.blok.seo.og_image || props.blok.image || props.blok.heroImage || props.blok.cardImage) &&
          <meta name="twitter:image"
              content={props.blok.seo.twitter_image} />
        }
      </Helmet>
    </SbEditable>
  )
}

export default SeoSocial
