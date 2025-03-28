import React from 'react';
import { cnb } from 'cnbuilder';
import { StanfordLogo } from '@/components/StanfordLogo';
import Link from 'next/link';
import { FlexBox } from '@/components/FlexBox';
import * as styles from './Logo.styles';

/**
 * Stanford Department Branding Component.
 */
type LogoLockupProps = {
  text: string;
  isLink?: boolean;
  color?: 'default' | 'white';
  className?: string;
}

export const LogoLockup = ({
  text,
  isLink,
  color = 'default',
  className,
  ...rest
}: LogoLockupProps) => {
  const levers: { [key: string]: string } = {};
  levers.textColor = styles.textColor[color];
  levers.bar = styles.barColor[color];

  // Partials
  const LockupContent = (
    <FlexBox className={styles.contentWrapper}>
      <StanfordLogo
        color={color === 'white' ? 'white' : 'cardinal-red'}
        isLink={false}
        className={cnb(styles.logo)}
      />
      <div className={cnb(styles.bar, levers.bar)} aria-hidden />
      <div className={cnb(styles.text, levers.textColor)}>
        {text}
      </div>
    </FlexBox>
  );

  if (isLink) {
    return (
      <Link
        className={cnb(styles.root, className)}
        href="/"
        {...rest}
      >
        {LockupContent}
      </Link>
    );
  }

  return (
    <div className={cnb(styles.root, className)} {...rest}>
      {LockupContent}
    </div>
  );
};
