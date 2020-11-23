import React from "react"
import Link from 'gatsby-link'
import SbEditable from 'storyblok-react'

/* Reusable Storyblok Link component for various link types - internal, external, asset */

const SbLink = (props) => {
  // Storyblok link object either has a url (external links) or cached_url (internal or asset links)
  let linkUrl = props.link.url || props.link.cached_url;

  if (props.link.linktype === "story") {
    return (
      <Link
        to={linkUrl === "home" ? "/" : `/${linkUrl}${linkUrl.endsWith("/") ? "" : "/"}`}
        className={props.internalClsses}
        {...{activeClassName : props.activeClass}}
      >
        {props.children}
      </Link>
    )
  }
  else if (props.link.linktype === "url") {
    return (
      <a href={linkUrl} className={`su-link--external ${props.externalClasses}`}>{props.children}</a>
    )
  }
  else if (props.link.linktype === "asset") {
    return (
      <a href={linkUrl} className={props.assetClasses} {...{target : "_blank"}}>{props.children}</a>
    )
  } else {
    return (
      <a href={linkUrl}>{props.children}</a>
    )
  }
};

export default SbLink

