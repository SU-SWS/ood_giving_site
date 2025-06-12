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
  rel?: string;
};

export const CtaExternalLink = React.forwardRef<HTMLAnchorElement, CtaExternalLinkProps>(
  (props, ref) => {
    const {
      isButton,
      buttonStyle,
      buttonSize,
      textColor,
      icon,
      iconProps,
      align,
      srText,
      rel,
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
        rel={rel}
        ref={ref as React.ForwardedRef<HTMLAnchorElement>}
        className={cnb(
          styles.cta,
          isButton ? styles.ctaButtonBase : '',
          isButton ? styles.ctaButtonStyles[buttonStyle] : '',
          isButton ? styles.ctaButtonSizes[buttonSize || 'default'] : '',
          !isButton ? styles.ctaTextColors[textColor] : '',
          mt ? marginTops[mt] : '',
          mb ? marginBottoms[mb] : '',
          className,
        )}
      >
        <CtaContent
          buttonStyle={buttonStyle}
          icon={icon}
          iconProps={iconProps}
          srText={srText}
        >
          {children}
        </CtaContent>
      </a>
    );
  },
);
