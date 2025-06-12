import React from 'react';
import { cnb } from 'cnbuilder';
import Link from 'next/link';
import { type LinkProps } from 'next/link';
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
    variant = 'link',
    color,
    size,
    icon,
    iconPosition = 'right',
    animate,
    iconProps,
    srText,
    target,
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
    </Link>
  );
});
