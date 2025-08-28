'use client';
import React from 'react';
import { config } from '@/utilities/config';
import Link from 'next/link';
import { type SbLinkType } from '@/components/Storyblok/Storyblok.types';
import { getMaskedAsset } from '@/utilities/getMaskedAsset';

export type SbLinkProps = {
  link: SbLinkType;
  className?: string;
  attributes?: Record<string, unknown>;
  children: React.ReactNode;
};

/**
 * Reusable Storyblok Link component for various link types
 * eg: internal, external, asset
 **/
export const SbLink = React.forwardRef<HTMLAnchorElement, SbLinkProps>((props, ref) => {
  const {
    link,
    className,
    attributes,
    children,
  } = props;

  const basePath = config.basePath;

  // Storyblok link object either has a url (external links)
  // or cached_url (internal or asset links)
  let linkUrl = (link.url || link.cached_url || '') as string;

  const otherAttributes = attributes ?? {};

  // Story or Internal type link.
  // ---------------------------------------------------------------------------
  if (link.linktype === 'story') {
    // If the internal link already starts with a slash (eg, WYSIWYG inline internal links), remove it.
    if (linkUrl.startsWith('/')) {
      linkUrl = linkUrl.substring(1);
    }
    // Handle the home slug.
    linkUrl = linkUrl === 'home' ? basePath : basePath + linkUrl;
    linkUrl += linkUrl.endsWith('/') ? '' : '/';
    // If there's an anchor, add it to the end of the url.
    if (link.anchor) {
      linkUrl += '#' + link.anchor;
    }

    return (
      <Link
        ref={ref}
        href={linkUrl}
        className={className}
        {...otherAttributes}
      >
        {children}
      </Link>
    );
  }

  // External or absolute url type link.
  // ---------------------------------------------------------------------------
  if (link.linktype === 'url') {
    return (
      <a
        ref={ref}
        href={linkUrl}
        className={className}
        {...otherAttributes}
      >
        {children}
      </a>
    );
  }

  // A link to a file or other asset.
  // ---------------------------------------------------------------------------
  if (link.linktype === 'asset') {
    // Rewrite the URL to the redirect link to mask the API endpoint.
    linkUrl = getMaskedAsset(linkUrl);

    return (
      <a
        ref={ref}
        href={linkUrl}
        className={className}
        target="_blank"
        {...otherAttributes}
      >
        {children}
      </a>
    );
  }

  // Default if we don't know what type this is.
  // ---------------------------------------------------------------------------
  return (
    <a ref={ref} href={linkUrl} className={className} {...otherAttributes}>
      {children}
    </a>
  );
});
