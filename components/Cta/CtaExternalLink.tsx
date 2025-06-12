'use client';
import React, { useEffect, useState } from 'react';
import { cnb } from 'cnbuilder';
import { CtaContent } from './CtaContent';
import { type CtaCommonProps } from './Cta.types';
import { type SbLinkType } from '../Storyblok/Storyblok.types';
import { marginTops, marginBottoms } from '@/utilities/datasource';
import * as styles from './Cta.styles';
import useUTMs from '@/hooks/useUTMs';

export type CtaExternalLinkProps = React.ComponentPropsWithoutRef<'a'> & CtaCommonProps & {
  sbLink?: SbLinkType;
  href?: string;
};

export const CtaExternalLink = React.forwardRef<HTMLAnchorElement, CtaExternalLinkProps>(
  (props, ref) => {
    const {
      variant = 'link',
      color = variant !== 'inline' ? 'white' : '',
      size,
      curve,
      icon,
      iconPosition = 'right',
      animate,
      iconProps,
      srText,
      mt,
      mb,
      children,
      className,
      href,
      ...rest
    } = props;

    // Add UTM params to Stanford URLs.
    const { isStanfordUrl, addUTMsToUrl } = useUTMs();
    const [myHref, setMyHref] = useState<string>(href);
    useEffect(() => {
      if (typeof window === 'undefined') return;
      if (isStanfordUrl(href)) {
        setMyHref(addUTMsToUrl(href));
      }
    }, [href, isStanfordUrl, addUTMsToUrl]);

    return (
      <a
        {...rest}
        href={myHref}
        ref={ref as React.ForwardedRef<HTMLAnchorElement>}
        className={cnb(
          styles.cta,
          styles.ctaVariants[variant],
          styles.ctaSizes[size] || styles.ctaSizes[styles.ctaSizeMap[variant]],
          color ? styles.ctaColors[color] : '',
          mt ? marginTops[mt] : '',
          mb ? marginBottoms[mb] : '',
          className,
        )}
      >
        <CtaContent
          variant={variant}
          icon={icon}
          iconPosition={iconPosition}
          animate={animate}
          iconProps={iconProps}
          srText={srText}
        >
          {children}
        </CtaContent>
      </a>
    );
  },
);
