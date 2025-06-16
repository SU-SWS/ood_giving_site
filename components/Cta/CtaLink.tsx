'use client';
import React from 'react';
import { type LinkProps } from 'next/link';
import { type CtaCommonProps } from './Cta.types';
import { CtaExternalLink } from './CtaExternalLink';
import { CtaNextLink } from './CtaNextLink';
import { type SbLinkType } from '../Storyblok/Storyblok.types';
import { getMaskedAsset } from '@/utilities/getMaskedAsset';

/**
 * Use this component for CTA links.
 * You can pass in a Storyblok link field sbLink or a href that is internal or external.
 */
export type CtaLinkProps = Omit<LinkProps, 'href'> & React.ComponentPropsWithoutRef<'a'> & CtaCommonProps & {
  sbLink?: SbLinkType;
  href?: string;
  rel?: string;
};

export const CtaLink = React.forwardRef<HTMLAnchorElement, CtaLinkProps>(
  (props, ref) => {
    const {
      sbLink,
      href = '',
      ...rest
    } = props;

    const {
      linktype,
      cached_url: cachedUrl,
      url,
      email,
      target,
      anchor,
      // External link in Storyblok can have additional custom attributes
      ...sbLinkProps
    } = sbLink || {};

    /**
     * Filter out fieldtype and keep only props with non empty values from sbLinkProps.
     * These include additional attributes such as rel, title and custom attributes that the user can pass in.
     */
    const sbLinkPropsToKeep = Object.fromEntries(
      Object.entries(sbLinkProps).filter(([key, value]) => key !== 'fieldtype' && value !== '' && value !== null && value !== undefined),
    );

    // Check for internal links
    const isInternal: boolean = linktype === 'story' || /^\/(?!\/)/.test(href);

    let myLink: string = '';

    if (isInternal) {
      myLink = cachedUrl || href;

      if (anchor) {
        myLink = `${myLink}#${anchor}`;
      }
    } else if (linktype === 'email') {
      myLink = `mailto:${email}`;
    } else if (linktype === 'asset') {
      myLink = getMaskedAsset(url || href);
    } else {
      myLink = url || cachedUrl || href;
    }

    if (isInternal) {
      return (
        <CtaNextLink
          {...rest}
          ref={ref}
          href={myLink}
          target={target || undefined}
        />
      );
    }

    return (
      <CtaExternalLink
        {...rest}
        {...sbLinkPropsToKeep}
        ref={ref}
        href={myLink}
        target={target || undefined}
      />
    );
  },
);
