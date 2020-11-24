import React from "react"
import Link from 'gatsby-link'
import { config } from "../../utilities/config"

/**
 * Reusable Storyblok Link component for various link types
 * eg: internal, external, asset
 **/

const SbLink = (props) => {
  const basePath = config.basePath

  // Storyblok link object either has a url (external links)
  // or cached_url (internal or asset links)
  let linkUrl = props.link.url || props.link.cached_url

  // Default Classes for all links.
  const linkClasses = props.classes ?? ""
  const storyClasses = props.internalClasses ?? ""
  const urlClasses = props.externalClasses ?? ""
  const activeClass = props.activeClass ?? ""
  const assetClasses = props.assetClasses ?? ""
  const otherAttributes = props.attributes ?? {}

  // Story or Internal type link.
  // ---------------------------------------------------------------------------
  if (props.link.linktype === "story") {

    // Handle the home slug.
    linkUrl = (linkUrl === "home") ? basePath : basePath + linkUrl
    linkUrl += linkUrl.endsWith("/") ? "" : "/"

    return (
      <Link
        to={linkUrl}
        className={linkClasses + " " + storyClasses}
        activeClassName={activeClass}
        {...otherAttributes}
      >
        {props.children}
      </Link>
    )
  }

  // External or absolute url type link.
  // ---------------------------------------------------------------------------
  if (props.link.linktype === "url") {
    return (
      <a
        href={linkUrl}
        className={linkClasses + " " + urlClasses}
        {...otherAttributes}
      >
        {props.children}
      </a>
    )
  }

  // A link to a file or other asset.
  // ---------------------------------------------------------------------------
  if (props.link.linktype === "asset") {
    return (
      <a
        href={linkUrl}
        className={linkClasses + " " + assetClasses}
        target={`_blank`}
        {...otherAttributes}
      >
        {props.children}
      </a>
    )
  }

  // Default if we don't know what type this is.
  // ---------------------------------------------------------------------------
  return (
    <a
      href={linkUrl}
      className={linkClasses}
      {...otherAttributes}
    >
      {props.children}
    </a>
  )

};

export default SbLink
