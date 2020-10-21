import React from 'react'
import Link from 'gatsby-link'
import SbEditable from 'storyblok-react'

const CtaLink = (props) => (
  <SbEditable content={props.blok}>
    {props.blok.linkText && (
      <div className={`ood-cta su-block su-text-align-${props.blok.align}`}>
        {props.blok.link.linktype === "story" &&
          <Link to={props.blok.link.cached_url === "home" ? "/" : `/${props.blok.link.cached_url}${props.blok.link.cached_url.endsWith("/") ? "" : "/"}`}
                className={props.blok.isButton === true ?
                  `ood-cta__button ${props.blok.linkButtonStyle} ${props.blok.linkButtonSize} ${props.blok.linkIcon}`
                  : `su-link ood-cta__link ${props.blok.linkIcon} ${props.blok.linkTextColor}`}
                {...props.blok.rel ? {rel : props.blok.rel} : {}}
          >{props.blok.linkText}<span className="su-sr-only-element">{` ${props.blok.srText}`}</span></Link>
        }
        {props.blok.link.linktype === "url" &&
          <a href={props.blok.link.url}
             className={props.blok.isButton === true ?
               `ood-cta__button ${props.blok.linkButtonStyle} ${props.blok.linkButtonSize} ${props.blok.linkIcon}`
               : `su-link ood-cta__link ${props.blok.linkIcon} ${props.blok.linkTextColor}`}
             {...props.blok.rel ? {rel : props.blok.rel} : {}}
          >{props.blok.linkText}<span className="su-sr-only-element">{` ${props.blok.srText}`}</span></a>
        }
      </div>
    )}
  </SbEditable>
);

export default CtaLink
