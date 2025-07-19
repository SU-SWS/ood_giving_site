import { CtaLink } from '@/components/Cta';
import { SimpleCard, type SimpleCardProps } from '@/components/SimpleCard';
import { Heading } from '@/components/Typography';
import { FlexBox } from '@/components/FlexBox';
import { FullWidthImage, type FullWidthImageProps } from '@/components/Image';
import { type LightPageBgColorType, type LightBeforeColorType } from '@/utilities/datasource';
import { type SbLinkType } from '@/components/Storyblok/Storyblok.types';
import * as styles from './HomepageHero.styles';

type HomepageHeroProps = FullWidthImageProps & SimpleCardProps & {
  splashText?: string;
  ctaHeadline?: string;
  ctaText?: string;
  link?: SbLinkType;
  // Options
  splashTextSize: 8 | 9;
  tabColor?: LightBeforeColorType;
  sectionBgColor?: LightPageBgColorType;
  isDarkText?: boolean;
};

export const HomepageHero = ({
  splashText,
  ctaHeadline,
  ctaText,
  link,
  filename,
  alt,
  visibleVertical = 'center',
  bgColor = 'palo-verde-dark',
  sectionBgColor = 'white',
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
          className={styles.imageWrapper}
        />
      )}
      <FlexBox alignItems="end" justifyContent="end" className={styles.cardWrapper}>
        <SimpleCard bgColor={a11yBgColor} className={styles.card} hasLink>
          {ctaHeadline && (
            <Heading color={isDarkText ? 'black' : 'white'} size={3} font="sans" weight="semibold">{ctaHeadline}</Heading>
          )}
          {link && (
            <CtaLink sbLink={link} className={styles.ctaWrapper}>
              {ctaText}
            </CtaLink>
          )}
        </SimpleCard>
      </FlexBox>
    </article>
  );
};
