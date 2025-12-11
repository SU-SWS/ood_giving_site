'use client';
import React, { useMemo } from 'react';
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

  const { addUTMsToUrl } = useUTMs();

  // Storyblok link object either has a url (external links)
  // or cached_url (internal or asset links)
  const rawLinkUrl = link.url || link.cached_url || '';
  const isExternalLink = link.linktype === 'url';

  // Ensure linkUrl is always a string and not undefined/null
  const baseLinkUrl = useMemo(() => {
    if (typeof rawLinkUrl !== 'string') {
      return '';
    }
    return rawLinkUrl;
  }, [rawLinkUrl]);

  const otherAttributes = attributes ?? {};

  // Compute external URL with UTMs
  const externalHref = useMemo(() => {
    if (isExternalLink && isStanfordUrl(baseLinkUrl)) {
      return addUTMsToUrl(baseLinkUrl);
    }
    return baseLinkUrl;
  }, [isExternalLink, baseLinkUrl, addUTMsToUrl]);

  // Story or Internal type link.
  // ---------------------------------------------------------------------------
  if (link.linktype === 'story') {
    let linkUrl = baseLinkUrl;
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
    const linkUrl = getMaskedAsset(baseLinkUrl);

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
    <a ref={ref} href={baseLinkUrl} className={className} {...otherAttributes}>
      {children}
    </a>
  );
});
