'use client';
import React from 'react';
import { config } from '@/utilities/config';
import { cnb } from 'cnbuilder';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { SrOnlyText } from '@/components/Typography';
import { type SbLinkType } from '../Storyblok.types';
import { getMaskedAsset } from '@/utilities/getMaskedAsset';

// TODO DS-1495: Let's see if we can clean this up a bit
export type SbLinkProps = {
  link: SbLinkType;
  classes?: string;
  internalClasses?: string;
  externalClasses?: string;
  activeClass?: string;
  assetClasses?: string;
  hasExternalIcon?: boolean;
  attributes?: Record<string, unknown>;
  children: React.ReactNode;
};

/**
 * Reusable Storyblok Link component for various link types
 * eg: internal, external, asset
 **/
export const SbLink = React.forwardRef<HTMLAnchorElement, SbLinkProps>((props, ref) => {
  const basePath = config.basePath;

  // Storyblok link object either has a url (external links)
  // or cached_url (internal or asset links)
  let linkUrl = (props.link.url || props.link.cached_url || '') as string;

  // Default Classes for all links.
  const linkClasses = props.classes ?? '';
  const storyClasses = props.internalClasses ?? '';
  const urlClasses = props.externalClasses ?? '';
  // TODO DS-1495
  // const activeClass = props.activeClass ?? '';
  const assetClasses = props.assetClasses ?? '';
  const otherAttributes = props.attributes ?? {};

  // Get out of the url and keep track of specific utm parameters.
  const location = useSearchParams();
  const parsedSearch = new URLSearchParams(location);
  // utms variable will create a string of just the valid params we want to keep.
  let utms = '';
  const passParams = [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_term',
    'utm_content',
  ];
  // Loop through the paramaters we want to continue to track and check to see
  // if the existing page url has them.
  passParams.forEach((queryParam) => {
    if (parsedSearch.has(queryParam)) {
      utms += `${queryParam}=${parsedSearch.get(queryParam)}&`;
    }
  });
  // Strip off the last ampersand.
  utms = utms.replace(new RegExp('&$'), '');

  // Story or Internal type link.
  // ---------------------------------------------------------------------------
  if (props.link.linktype === 'story') {
    // If the internal link already starts with a slash (eg, WYSIWYG inline internal links), remove it.
    if (linkUrl.startsWith('/')) {
      linkUrl = linkUrl.substring(1);
    }
    // Handle the home slug.
    linkUrl = linkUrl === 'home' ? basePath : basePath + linkUrl;
    linkUrl += linkUrl.endsWith('/') ? '' : '/';

    if (linkUrl.match(/\?/) && utms.length) {
      linkUrl += '&' + utms;
    } else if (utms.length) {
      linkUrl += '?' + utms;
    }

    return (
      <Link
        ref={ref}
        href={linkUrl}
        className={cnb(linkClasses, storyClasses)}
        // TODO DS-1495: Figure out what to do here
        // activeClassName={activeClass}
        {...otherAttributes}
      >
        {props.children}
      </Link>
    );
  }

  // External or absolute url type link.
  // ---------------------------------------------------------------------------
  if (props.link.linktype === 'url') {
    return (
      <a
        ref={ref}
        href={linkUrl}
        className={cnb(linkClasses, urlClasses)}
        {...otherAttributes}
      >
        {props.children}
        <SrOnlyText />
      </a>
    );
  }

  // A link to a file or other asset.
  // ---------------------------------------------------------------------------
  if (props.link.linktype === 'asset') {
    // Rewrite the URL to the redirect link to mask the API endpoint.
    linkUrl = getMaskedAsset(linkUrl);

    return (
      <a
        ref={ref}
        href={linkUrl}
        className={cnb(linkClasses, assetClasses)}
        target={`_blank`}
        {...otherAttributes}
      >
        {props.children}
      </a>
    );
  }

  // Default if we don't know what type this is.
  // ---------------------------------------------------------------------------
  return (
    <a ref={ref} href={linkUrl} className={linkClasses} {...otherAttributes}>
      {props.children}
    </a>
  );
});
