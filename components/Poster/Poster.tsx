import { SimpleCard, type SimpleCardProps } from '@/components/SimpleCard';
import { Heading, type HeadingType } from '@/components/Typography';
import { FlexBox } from '@/components/FlexBox';
import { FullWidthImage, type FullWidthImageProps } from '@/components/Image';
import { type LightPageBgColorType, type GradientOverlayType } from '@/utilities/datasource';
import * as styles from './Poster.styles';

type PosterProps = FullWidthImageProps & SimpleCardProps & {
  headline?: string;
  bodyText?: React.ReactNode;
  ctaLink?: React.ReactNode;
  overlay?: GradientOverlayType;
  sectionBgColor?: LightPageBgColorType;
  cardPosition?: 'left' | 'right';
  headingLevel?: HeadingType;
  isDarkText?: boolean;
};

export const Poster = ({
  headline,
  bodyText,
  ctaLink,
  filename,
  alt,
  visibleVertical = 'center',
  overlay = 'none',
  bgColor = 'palo-verde-dark',
  cardPosition = 'right',
  sectionBgColor = 'white',
  headingLevel = 'h2',
  isDarkText,
  ...props
}: PosterProps) => {
  /**
   * Color contrast of white text on palo verde background is 3.5:1 which is insufficient for small text
   * If palo verde is chosen as background color, use palo verde dark instead (4.91:1 contrast ratio)
   */
  const a11yBgColor = bgColor === 'palo-verde' ? 'palo-verde-dark' : bgColor;
  const hasOverlay = !!overlay && overlay !== 'none';

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
      {hasOverlay && (
        <div aria-hidden="true" className={styles.overlay(overlay)} />
      )}
      <FlexBox alignItems="end" justifyContent={cardPosition === 'left' ? 'start' : 'end'} className={styles.cardWrapper}>
        <SimpleCard bgColor={a11yBgColor} className={styles.card}>
          {headline && (
            <Heading as={headingLevel} color={isDarkText ? 'black' : 'white'} size={3} font="sans" weight="semibold">{headline}</Heading>
          )}
          {bodyText}
          {ctaLink && (
            <div className={styles.ctaWrapper}>
              {ctaLink}
            </div>
          )}
        </SimpleCard>
      </FlexBox>
    </article>
  );
};
