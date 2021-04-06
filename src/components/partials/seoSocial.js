import React from 'react'
import { Helmet } from "react-helmet"
import SbEditable from "storyblok-react"
import UseSiteMetadata from "../../hooks/useSiteMetadata"
import transformImage from "../../utilities/transformImage"
/*
** If no Twitter specific metadata is provided,
* Twitter can still read the generic OG metadata.
* The Storyblok SEO OG image and Twitter image make use of the old image block,
* and thus returns a string, not an object like the new asset block.
*/

const SeoSocial = (props) => {
  if (props.blok.seo == null) {
    return null;
  }

  const { title, siteUrl } = UseSiteMetadata();
  let ogImage = props.blok.seo.og_image ?? "";
  let twitterImage = props.blok.seo.twitter_image ?? "";

  if (ogImage !== "") {
    ogImage = transformImage(ogImage, "/1200x630");
  }

  if (twitterImage !== "") {
    twitterImage = transformImage(twitterImage, "/1200x600");
  }
  const canonicalUrl = getCanonicalUrl(props.blok, siteUrl)

  return (
    <SbEditable content={props.blok}>
      <Helmet titleTemplate={`%s | ${title}`} title={props.blok.title}>
        {canonicalUrl &&
          <link rel="canonical" href={canonicalUrl} />
        }
        {(props.blok.seo.description || props.blok.teaser) &&
          <meta name="description"
              content={props.blok.seo.description || props.blok.teaser} />
        }
        {(props.blok.seo.og_title || props.blok.title) &&
          <meta property="og:title"
              content={props.blok.seo.og_title || props.blok.title} />
        }
        {(props.blok.seo.og_description || props.blok.seo.description || props.blok.teaser) &&
          <meta property="og:description"
              content={props.blok.seo.og_description || props.blok.seo.description || props.blok.teaser} />
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

function getCanonicalUrl(blok, siteUrl) {
  // Default: Use the current path as the canonical URL
  let canonicalUrl = siteUrl + location.pathname;

  if (!blok.canonicalURL) return canonicalUrl;

  // If an absolute URL was specified...
  if (blok.canonicalURL.linktype == 'url') {
    canonicalUrl = blok.canonicalURL.url;
  }
  // If the user referenced another page within Storyblok...
  else if (blok.canonicalURL.linktype == 'story' && blok.canonicalURL.cached_url) {
    canonicalUrl = siteUrl + '/' + blok.canonicalURL.cached_url;
  }

  return canonicalUrl;
}

export default SeoSocial
