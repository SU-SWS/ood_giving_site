'use client';
import React, { useEffect, useState } from 'react';
import { config } from '@/utilities/config';
import Link from 'next/link';
import { type SbLinkType } from '@/components/Storyblok/Storyblok.types';
import { getMaskedAsset } from '@/utilities/getMaskedAsset';
import useUTMs from '@/hooks/useUTMs';
import { isStanfordUrl } from '@/utilities/isStanfordUrl';

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
  const { addUTMsToUrl } = useUTMs();

  // Storyblok link object either has a url (external links)
  // or cached_url (internal or asset links)
  let linkUrl = link.url || link.cached_url || '';
  const isExternalLink = link.linktype === 'url';

  // Ensure linkUrl is always a string and not undefined/null
  if (typeof linkUrl !== 'string') {
    linkUrl = '';
  }

  const otherAttributes = attributes ?? {};

  // State for external URL with UTMs
  const [externalHref, setExternalHref] = useState<string>(linkUrl);

  // Update external href when UTMs are available
  useEffect(() => {
    if (isExternalLink && isStanfordUrl(linkUrl)) {
      setExternalHref(addUTMsToUrl(linkUrl));
    }
  }, [isExternalLink, linkUrl, addUTMsToUrl]);

  // Story or Internal type link.
  // ---------------------------------------------------------------------------
  if (link.linktype === 'story') {
    // Ensure internal links start with a slash for relative paths
    if (!linkUrl.startsWith('/')) {
      linkUrl = '/' + linkUrl;
    }
    // Handle the home slug.
    if (linkUrl === '/home') {
      linkUrl = '/';
    }
    // Ensure trailing slash for non-root paths
    if (linkUrl !== '/' && !linkUrl.endsWith('/')) {
      linkUrl += '/';
    }
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
  if (isExternalLink) {
    return (
      <a
        ref={ref}
        href={externalHref}
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
