'use client';
import React, { useRef } from 'react';
import { cnb } from 'cnbuilder';

type SkiplinkProps = Omit<React.ComponentPropsWithoutRef<'a'>, 'href' | 'className' | 'children'> & {
  href?: string;
  className?: string;
  children?: string;
};

export const Skiplink = ({
  href = '#main-content',
  children = 'Skip to main content',
  className,
  ...rest
}: SkiplinkProps) => {
  const ref = useRef<null | HTMLAnchorElement>(null);

  return (
    <a
      {...rest}
      ref={ref}
      href={href}
      onFocus={() => ref.current?.scrollIntoView()}
      className={cnb('skiplink', className)}
    >
      {children}
    </a>
  );
};
