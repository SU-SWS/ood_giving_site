import { CtaLink } from '@/components/Cta';
import { SimpleCard, type SimpleCardProps } from '@/components/SimpleCard';
import { Heading } from '@/components/Typography';
import { FlexBox } from '@/components/FlexBox';
import { FullWidthImage, type FullWidthImageProps } from '@/components/Image';
import { type LightPageBgColorType, type AllCardBgColorType } from '@/utilities/datasource';
import { type SbLinkType } from '@/components/Storyblok/Storyblok.types';
import * as styles from './HomepageHero.styles';

type HomepageHeroProps = FullWidthImageProps & SimpleCardProps & {
  splashText?: string;
  ctaHeadline?: string;
  ctaText?: string;
  link?: SbLinkType;
  // Options
  splashTextSize: 8 | 9;
  tabColor?: AllCardBgColorType;
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
  /**
   * Color contrast of white text on palo verde background is 3.5:1 which is insufficient for small text
   * If palo verde is chosen as background color, use palo verde dark instead (4.91:1 contrast ratio)
   */
  const a11yBgColor = bgColor === 'palo-verde' ? 'palo-verde-dark' : bgColor;

  return (
    <article className={styles.root(sectionBgColor)} {...props}>
      {filename && (
        <FullWidthImage
          filename={filename}
          alt={alt}
          visibleVertical={visibleVertical}
          visibleHorizontal={visibleHorizontal}
          className={styles.imageWrapper}
        />
      )}
      <FlexBox alignItems="end" justifyContent="between" className={styles.heroContent}>
        <div className={styles.h1Wrapper}>
          <Heading
            as="h1"
            size={splashTextSize === 9 ? 'f9' : 'f8'}
            weight="semibold"
            color="white"
            leading="tight"
            className={styles.h1}
          >
            {splashText}
          </Heading>
          <div className={styles.tab(tabColor)} />
        </div>
        <SimpleCard bgColor={a11yBgColor} className={styles.card} hasLink>
          <div className={styles.cardContent}>
            {ctaHeadline && (
              <Heading color={isDarkText ? 'black' : 'white'} size={3} font="sans" weight="semibold" className={styles.cardHeading}>
                {ctaHeadline}
              </Heading>
            )}
            {link && (
              <CtaLink sbLink={link} icon="su-link--action" className={styles.cta}>
                {ctaText}
              </CtaLink>
            )}
          </div>
        </SimpleCard>
      </FlexBox>
    </article>
  );
};
