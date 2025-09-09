'use client';
import React, { useEffect, useState } from 'react';
import { cnb } from 'cnbuilder';
import { CtaContent } from './CtaContent';
import { type CtaCommonProps } from './Cta.types';
import { marginTops, marginBottoms } from '@/utilities/datasource';
import * as styles from './Cta.styles';
import useUTMs from '@/hooks/useUTMs';
import { isStanfordUrl } from '@/utilities/isStanfordUrl';

export type CtaExternalLinkProps = React.ComponentPropsWithoutRef<'a'> & CtaCommonProps & {
  href: string;
  rel?: string;
};

export const CtaExternalLink = React.forwardRef<HTMLAnchorElement, CtaExternalLinkProps>((props, ref) => {
  const {
    isButton,
    buttonStyle = 'ood-cta__button--primary su-after-bg-white',
    buttonSize = 'default',
    textColor = 'su-text-digital-red su-after-bg-digital-red su-text-hocus-plum-dark su-after-bg-hocus-plum-dark',
    variant,
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
  const { addUTMsToUrl } = useUTMs();
  const [myHref, setMyHref] = useState<string>(href);
  useEffect(() => {
    if (isStanfordUrl(href)) {
      setMyHref(addUTMsToUrl(href));
    }
  }, [href, addUTMsToUrl]);

  return (
    <a
      {...rest}
      href={myHref}
      rel={rel}
      ref={ref as React.ForwardedRef<HTMLAnchorElement>}
      className={cnb(
        styles.cta,
        styles.ctaAligns[align],
        isButton ? styles.buttonBase : '',
        !isButton && !variant ? styles.textLinkBase : '',
        isButton ? styles.ctaButtonStyles[buttonStyle] : '',
        isButton ? styles.ctaButtonSizes[buttonSize] : '',
        !isButton && !variant ? styles.ctaTextColors[textColor] : '',
        variant ? styles.ctaVariants[variant] : '',
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
        align={align}
      >
        {children}
      </CtaContent>
    </a>
  );
});
