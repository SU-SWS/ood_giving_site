import React, { type ElementType, type HTMLAttributes } from 'react';

export type CenteredContainerProps = {
  element?: string;
  centered_disabled?: boolean;
  flex?: boolean;
  srOnly?: boolean;
  classes?: string;
  children?: React.ReactNode;
}

export const CenteredContainer = ({
  element,
  centered_disabled,
  flex,
  srOnly,
  classes,
  children,
  ...rest
}: CenteredContainerProps) => {
  const Element = element ?? 'div' as ElementType<HTMLAttributes<HTMLElement>>;

  return (
    <Element
      className={`
        ${centered_disabled ? '' : 'centered-container'}
        ${flex ? 'flex-container' : ''}
        ${srOnly ? 'su-sr-only-element' : ''}
        ${classes ?? ''}
      `}
      {...rest}
    >
      {children}
    </Element>
  );
};
