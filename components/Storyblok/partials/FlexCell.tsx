import React, { type ElementType, type HTMLAttributes } from 'react';
import { type ClassValue, cnb } from 'cnbuilder';

export type FlexCellProps = {
  element?: string;
  id?: string;
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  xxl?: number;
  className?: ClassValue;
  children?: React.ReactNode;
};

export const FlexCell = ({
  element,
  id,
  xs,
  sm,
  md,
  lg,
  xl,
  xxl,
  className = '',
  children,
  ...rest
}: FlexCellProps) => {
  const Element = element ?? 'div' as ElementType<HTMLAttributes<HTMLElement>>;

  return (
    <Element
      className={cnb(className, {
        [`flex-xs-${xs}-of-12`]: !!xs,
        [`flex-xs-${sm}-of-12`]: !!sm,
        [`flex-xs-${md}-of-12`]: !!md,
        [`flex-xs-${lg}-of-12`]: !!lg,
        [`flex-xs-${xl}-of-12`]: !!xl,
        [`flex-xs-${xxl}-of-12`]: !!xxl,
      })}
      {...(id ? { id } : {})}
      {...rest}
    >
      {children}
    </Element>
  );
};
