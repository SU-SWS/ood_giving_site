'use client';
import * as m from 'motion/react-m';
import { CtaLink } from '@/components/Cta';
import { SimpleCard, type SimpleCardProps } from '@/components/SimpleCard';
import { Heading } from '@/components/Typography';
import { FlexBox } from '@/components/FlexBox';
import { FullWidthImage, type FullWidthImageProps } from '@/components/Image';
import { type LightPageBgColorType, type LightBgColorType } from '@/utilities/datasource';
import { type SbLinkType } from '@/components/Storyblok/Storyblok.types';
import * as styles from './HomepageHero.styles';

type HomepageHeroProps = FullWidthImageProps & SimpleCardProps & {
  splashText?: string;
  ctaHeadline?: string;
  ctaText?: string;
  link?: SbLinkType;
  // Options
  splashTextSize: styles.SplashTextSizeType;
  tabColor?: LightBgColorType;
  sectionBgColor?: LightPageBgColorType;
  isDarkText?: boolean;
};

export const HomepageHero = ({
  splashText,
  splashTextSize = 9,
  ctaHeadline,
  ctaText,
  link,
  filename,
  alt,
  visibleVertical = 'center',
  visibleHorizontal = 'center',
  bgColor = 'palo-verde-dark',
  sectionBgColor = 'white',
  tabColor = 'digital-red',
  isDarkText,
  ...props
}: HomepageHeroProps) => {
  const isLightCardBg = bgColor === 'fog-light';

  return (
    <article className={styles.root(sectionBgColor)} {...props}>
      {filename && (
        <FullWidthImage
          filename={filename}
          alt={alt}
          visibleVertical={visibleVertical}
          visibleHorizontal={visibleHorizontal}
          className={styles.imageWrapper}
          fetchPriority="high"
        />
      )}
      <FlexBox className={styles.heroContent}>
        <m.div
          initial={{ filter: 'blur(12px)' }}
          animate={{ filter: 'blur(0px)' }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className={styles.h1Wrapper}
        >
          <Heading
            as="h1"
            weight="semibold"
            color="white"
            leading="tight"
            className={styles.h1(splashTextSize)}
          >
            {splashText}
          </Heading>
          <div className={styles.tab(tabColor)} />
        </m.div>
        <SimpleCard bgColor={bgColor} className={styles.card} hasLink>
          <div className={styles.cardContent}>
            {ctaHeadline && (
              <Heading color={isDarkText ? 'black' : 'white'} size={3} font="sans" weight="semibold" className={styles.cardHeading}>
                {ctaHeadline}
              </Heading>
            )}
            {ctaText && (
              <CtaLink sbLink={link} icon="su-link--action" textColor={isLightCardBg ? 'black' : 'white'} className={styles.cta}>
                {ctaText}
              </CtaLink>
            )}
          </div>
        </SimpleCard>
      </FlexBox>
    </article>
  );
};
