import React from 'react';
import { type ClassValue, cnb } from 'cnbuilder';
import Link from 'next/link';
import { FlexBox } from '@/components/FlexBox';
import { StanfordLogo } from './StanfordLogo';
import * as styles from './LogoLockup.styles';

/**
 * Stanford Department Branding Component with the Stanford wordmark logo and department name.
 */
type LogoLockupProps = {
  text: string;
  isLink?: boolean;
  color?: styles.LogoTextColorType;
  className?: ClassValue;
}

export const LogoLockup = ({
  text,
  isLink,
  color = 'default',
  className,
  ...rest
}: LogoLockupProps) => {
  const LockupContent = (
    <FlexBox className={styles.contentWrapper} data-component="LogoLockup">
      <StanfordLogo
        color={color === 'white' ? 'white' : 'cardinal-red'}
        isLink={false}
        className={cnb(styles.logo)}
      />
      <div className={cnb(styles.bar, styles.barColors[color])} aria-hidden="true" />
      <div className={cnb(styles.text, styles.textColors[color])}>
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
