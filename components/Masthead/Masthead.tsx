import { HTMLAttributes } from 'react';
import { cnb } from 'cnbuilder';
import { FlexBox } from '@/components/FlexBox';
import { LogoLockup } from '@/components/Logo/LogoLockup';
import { Skiplink } from '@/components/SkipLink';
import { getProcessedImage } from '@/utilities/getProcessedImage';
import { getMaskedAsset } from '@/utilities/getMaskedAsset';
import { getSbImageSize } from '@/utilities/getSbImageSize';
import * as styles from './Masthead.styles';
import Link from 'next/link';
import Image from 'next/image';

type MastheadProps = HTMLAttributes<HTMLDivElement> & {
  sitename?: string;
  logoSrc?: string;
  isLight?: boolean;
  mainNav?: React.ReactNode;
};

export const Masthead = ({
  sitename = 'Giving',
  logoSrc,
  isLight,
  mainNav,
  className,
  ...props
}: MastheadProps) => {
  const { width, height } = getSbImageSize(logoSrc);
  const heightRatio: number = height / width;

  return (
    <header className={cnb(styles.root, className)} {...props}>
      <Skiplink />
      <FlexBox
        justifyContent="between"
        alignItems="center"
        className={styles.wrapper}
      >
        {!!logoSrc ? (
          <Link href="/">
            {logoSrc.endsWith('.svg') ? (
              <Image
                src={getMaskedAsset(logoSrc)}
                alt={sitename}
                width={width}
                height={height}
                className={styles.logoImage}
              />
            ) : (
              <picture>
                <source
                  src={getProcessedImage(logoSrc, '360x0')}
                  media="(min-width: 1200px)"
                  width={360}
                  height={Math.round(360 * heightRatio)}
                />
                <source
                  src={getProcessedImage(logoSrc, '300x0')}
                  media="(min-width: 992px)"
                  width={300}
                  height={Math.round(300 * heightRatio)}
                />
                <source
                  src={getProcessedImage(logoSrc, '260x0')}
                  media="(min-width: 768px)"
                  width={260}
                  height={Math.round(260 * heightRatio)}
                />
                <source
                  srcSet={getProcessedImage(logoSrc, '200x0')}
                  media="(max-width: 767px)"
                  width={200}
                  height={Math.round(200 * heightRatio)}
                />
                <img
                  src={getProcessedImage(logoSrc, '360x0')}
                  alt={sitename}
                  width={360}
                  height={Math.round(360 * heightRatio)}
                  className={styles.logoImage}
                />
              </picture>
            )}
          </Link>
        ) : (
          <LogoLockup
            isLink
            color={isLight ? 'default' : 'white'}
            text={sitename}
            className={styles.lockup}
          />
        )}
        <FlexBox alignItems="center" className={styles.flexbox}>
          {mainNav}
        </FlexBox>
      </FlexBox>
    </header>
  );
};
