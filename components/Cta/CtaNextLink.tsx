'use client';
import React from 'react';
import { cnb } from 'cnbuilder';
import Link, { type LinkProps } from 'next/link';
import { CtaContent } from './CtaContent';
import { type CtaCommonProps } from './Cta.types';
import { marginTops, marginBottoms } from '@/utilities/datasource';
import { sbStripSlugURL } from '@/utilities/sbStripSlugUrl';
import * as styles from './Cta.styles';

export type CtaNextLinkProps = CtaCommonProps & Omit<LinkProps, 'href'> & {
  href: string;
  target?: React.HTMLAttributeAnchorTarget;
  className?: string;
};

export const CtaNextLink = React.forwardRef<HTMLAnchorElement, CtaNextLinkProps>((props, ref) => {
  const {
    href = '',
    isButton,
    buttonStyle = 'ood-cta__button--primary su-after-bg-white',
    buttonSize = 'default',
    textColor = 'su-text-digital-red su-after-bg-digital-red su-text-hocus-sky-dark su-after-bg-hocus-sky-dark',
    variant,
    icon,
    iconProps,
    srText,
    target,
    align,
    mt,
    mb,
    children,
    className,
    ...rest
  } = props;
  const strippedHref = sbStripSlugURL(href);

  return (
    <Link
      {...rest}
      ref={ref}
      href={strippedHref}
      target={target}
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
    </Link>
  );
});
