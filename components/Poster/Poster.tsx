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
      <FullWidthImage
        filename={filename}
        alt={alt}
        visibleVertical={visibleVertical}
        className="h-[43rem] md:h-500 xl:h-[56rem] bg-black"
      />
      {hasOverlay && (
        <div aria-hidden="true" className={styles.overlay(overlay)} />
      )}
      <FlexBox alignItems="end" justifyContent={cardPosition === 'left' ? 'start' : 'end'} className="cc absolute inset-0">
        <SimpleCard bgColor={a11yBgColor} className="relative -bottom-60 md:-bottom-80 rs-px-4 rs-pt-4 rs-pb-5 w-full sm:w-9/12 md:w-8/12 lg:w-7/12 xl:w-1/2 lg:min-h-[39rem]">
          {headline && (
            <Heading color={isDarkText ? 'black' : 'white'} size={3} font="sans" weight="semibold">{headline}</Heading>
          )}
          {bodyText}
          {ctaLink && (
            <div className="rs-mt-3">
              {ctaLink}
            </div>
          )}
        </SimpleCard>
      </FlexBox>
    </article>
  );
};
