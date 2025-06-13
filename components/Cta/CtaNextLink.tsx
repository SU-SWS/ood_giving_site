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
    buttonStyle,
    buttonSize = 'default',
    textColor = 'su-text-digital-red su-after-bg-digital-red su-text-hocus-sky-dark su-after-bg-hocus-sky-dark',
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
        isButton ? styles.buttonBase : styles.textLinkBase,
        isButton ? styles.ctaButtonStyles[buttonStyle] : '',
        isButton ? styles.ctaButtonSizes[buttonSize] : '',
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
        align={align}
      >
        {children}
      </CtaContent>
    </Link>
  );
});
