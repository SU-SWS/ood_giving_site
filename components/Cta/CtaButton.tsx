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
      isButton,
      buttonStyle,
      buttonSize,
      textColor,
      align,
      icon,
      iconProps,
      srText,
      children,
      className,
      ...rest
    } = props;

    return (
      <button
        {...rest}
        type={type}
        ref={ref as React.ForwardedRef<HTMLButtonElement>}
        className={cnb(
          styles.cta,
          isButton ? styles.ctaButtonStyles[buttonStyle] : '',
          isButton ? styles.ctaButtonSizes[buttonSize] : '',
          !isButton ? styles.ctaTextColors[textColor] : '',
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
      </button>
    );
  },
);
