'use client';
import React from 'react';
import { cnb } from 'cnbuilder';
import { CtaContent } from './CtaContent';
import { type CtaCommonProps } from './Cta.types';
import { marginTops, marginBottoms } from '@/utilities/datasource';
import * as styles from './Cta.styles';

export type CtaButtonProps = React.ComponentPropsWithoutRef<'button'> & CtaCommonProps;

export const CtaButton = React.forwardRef<HTMLButtonElement, CtaButtonProps>(
  (props, ref) => {
    const {
      type = 'button',
      isButton,
      buttonStyle,
      buttonSize = 'default',
      textColor = 'su-text-digital-red su-after-bg-digital-red su-text-hocus-sky-dark su-after-bg-hocus-sky-dark',
      align,
      icon,
      iconProps,
      srText,
      mt,
      mb,
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
      </button>
    );
  },
);
