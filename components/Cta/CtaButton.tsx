'use client';

import React from 'react';
import { cnb } from 'cnbuilder';
import { CtaContent } from './CtaContent';
import { type CtaCommonProps } from './Cta.types';
import * as styles from './Cta.styles';

export type CtaButtonProps = React.ComponentPropsWithoutRef<'button'> & CtaCommonProps;

export const CtaButton = React.forwardRef<HTMLButtonElement, CtaButtonProps>(
  (props, ref) => {
    const {
      type = 'button',
      variant = 'solid',
      color = 'white',
      iconPosition = 'right',
      icon,
      size,
      curve,
      animate,
      iconProps,
      srText,
      children,
      className,
      ...rest
    } = props;

    return (
      <button
        {...rest}
        // eslint-disable-next-line react/button-has-type
        type={type}
        ref={ref as React.ForwardedRef<HTMLButtonElement>}
        className={cnb(
          styles.cta,
          styles.ctaVariants[variant],
          styles.ctaSizes[size] || styles.ctaSizes[styles.ctaSizeMap[variant]],
          curve ? styles.ctaCurves[curve] : '',
          color ? styles.ctaColors[color] : '',
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
      </button>
    );
  },
);
