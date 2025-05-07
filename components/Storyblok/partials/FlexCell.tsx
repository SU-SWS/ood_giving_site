import React, { ElementType, HTMLAttributes } from 'react';

export type FlexCellProps = {
  element?: string;
  id?: string;
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  xxl?: number;
  classes?: string;
  children?: React.ReactNode;
}

export const FlexCell = ({
  element,
  id,
  xs,
  sm,
  md,
  lg,
  xl,
  xxl,
  classes = '',
  children,
  ...rest
}: FlexCellProps) => {
  const Element = element ?? 'div' as ElementType<HTMLAttributes<HTMLElement>>;

  return (
    <Element
      className={`
        ${classes}
        ${xs ? `flex-xs-${xs}-of-12` : ''}
        ${sm ? `flex-sm-${sm}-of-12` : ''}
        ${md ? `flex-md-${md}-of-12` : ''}
        ${lg ? `flex-lg-${lg}-of-12` : ''}
        ${xl ? `flex-xl-${xl}-of-12` : ''}
        ${xxl ? `flex-2xl-${xxl}-of-12` : ''}
      `}
      {...(id ? { id } : {})}
      {...rest}
    >
      {children}
    </Element>
  );
};
