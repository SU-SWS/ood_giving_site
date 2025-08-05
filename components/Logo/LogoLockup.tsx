import { cnb } from 'cnbuilder';
import { SbLink } from '@/components/Storyblok/partials';
import { FlexBox } from '@/components/FlexBox';
import { StanfordLogo } from '@/components/Logo';
import { type SbLinkType } from '@/components/Storyblok/Storyblok.types';
import * as styles from './LogoLockup.styles';

/**
 * Stanford Department Branding Component with the Stanford wordmark logo and department name.
 */
type LogoLockupProps = {
  text: string;
  link?: SbLinkType;
  color?: styles.LogoTextColorType;
  // TW font size classes can be added to scale the logo at different breakpoints
  className?: string;
}

export const LogoLockup = ({
  text,
  link,
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

  if (link?.url || link?.cached_url) {
    return (
      <SbLink
        classes={cnb(styles.root, className)}
        link={link}
        {...rest}
      >
        {LockupContent}
      </SbLink>
    );
  }

  return (
    <div className={cnb(styles.root, className)} {...rest}>
      {LockupContent}
    </div>
  );
};
