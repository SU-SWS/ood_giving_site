import React from 'react'
import { Helmet } from "react-helmet"
import SbEditable from "storyblok-react"
import UseSiteMetadata from "../../hooks/useSiteMetadata"
import transformImage from "../../utilities/transformImage"

/*
** If no Twitter specific metadata is provided,
* Twitter can still read the generic OG metadata.
*/

const SeoSocial = (props) => {
  const { title } = UseSiteMetadata();
  let ogImage = props.blok.seo.og_image;
  let twitterImage = props.blok.seo.twitter_image;

  if (ogImage !== "") {
    ogImage = transformImage(ogImage, "/1200x630");
  }

  if (twitterImage !== "") {
    twitterImage = transformImage(twitterImage, "/1200x600");
  }

  return (
    <SbEditable content={props.blok}>
      <Helmet>
        <title>{`${props.blok.title} | ${title}`}</title>
        {(props.blok.seo.description || props.blok.teaser) &&
          <meta name="description"
              content={props.blok.seo.description || props.blok.teaser} />
        }
        {(props.blok.seo.og_title || props.blok.title) &&
          <meta property="og:title"
              content={props.blok.seo.og_title || props.blok.title} />
        }
        {(props.blok.seo.og_description || props.blok.teaser) &&
          <meta property="og:description"
              content={props.blok.seo.og_description || props.blok.teaser} />
        }
        {ogImage !== "" &&
          <meta property="og:image"
              content={ogImage} />
        }
        {props.blok.seo.twitter_title &&
          <meta name="twitter:title"
              content={props.blok.seo.twitter_title} />
        }
        {props.blok.seo.twitter_description &&
          <meta name="twitter:description"
              content={props.blok.seo.twitter_description} />
        }
        {twitterImage !== "" &&
          <meta name="twitter:image"
              content={twitterImage} />
        }
      </Helmet>
    </SbEditable>
  )
}

export default SeoSocial
