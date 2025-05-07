import React, { type ElementType, type HTMLAttributes } from 'react';

export type HeadingProps = {
  level?: string;
  defaultLevel?: string;
  classes?: string;
  serif?: boolean;
  weight?: string;
  color?: string;
  align?: string;
  external?: boolean;
  children?: React.ReactNode;
}

export const Heading = (props: HeadingProps) => {
  const HeadingTag = props.level || props.defaultLevel || 'h3' as ElementType<HTMLAttributes<HTMLHeadingElement>>;

  return (
    <HeadingTag
      className={`
        ${props.classes ? props.classes : ''}
        ${props.serif ? 'font-serif' : ''}
        ${props.weight ? `su-${props.weight}` : ''}
        ${props.color ? `su-text-${props.color}` : ''}
        ${props.align ? `su-text-align-${props.align}` : ''}
        ${props.external ? 'su-link--external' : ''}
      `}
    >
      {props.children}
    </HeadingTag>
  );
};
