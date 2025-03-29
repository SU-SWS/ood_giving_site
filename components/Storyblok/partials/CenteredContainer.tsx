import React, { type ElementType, type HTMLAttributes } from 'react';

type CenteredContainerProps = {
  element?: string;
  centered_disabled?: boolean;
  flex?: boolean;
  srOnly?: boolean;
  classes?: string;
  children?: React.ReactNode;
}

export const CenteredContainer = (props: CenteredContainerProps) => {
  const Element = props.element ?? 'div' as ElementType<HTMLAttributes<HTMLElement>>;

  return (
    <Element
      className={`
       ${props.centered_disabled ? '' : 'centered-container'}
       ${props.flex ? 'flex-container' : ''}
       ${props.srOnly ? 'su-sr-only-element' : ''}
       ${props.classes ?? ''}
  `}
    >
      {props.children}
    </Element>
  );
};
