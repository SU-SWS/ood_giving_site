import React from 'react'
import Link from 'gatsby-link'
import SbEditable from 'storyblok-react'

const CtaLink = (props) => (
  <SbEditable content={props.blok}>
    {props.blok.link.linktype === "story" &&
      <Link to={props.blok.link === 'home' ? "/" : `/${props.blok.link.cached_url}/`}
            className={props.blok.linkIcon ? `${props.blok.linkButtonSize} ${props.blok.linkButtonStyle} ${props.blok.linkIcon}` : `${props.blok.linkButtonSize} ${props.blok.linkButtonStyle}`}
            rel={props.blok.rel}
      >
        {props.blok.linkText}
      </Link>
    }
    {props.blok.link.linktype === "url" &&
      <a href={props.blok.link.url}
         className={props.blok.linkIcon ? `${props.blok.linkButtonSize} ${props.blok.linkButtonStyle} su-link--external ${props.blok.linkIcon}` : `${props.blok.linkButtonSize} ${props.blok.linkButtonStyle} su-link--external`}
         rel={props.blok.rel}
      >
       {props.blok.linkText}
      </a>
    }
  </SbEditable>
);

export default CtaLink
