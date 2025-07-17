import { OverhangCard, type OverhangCardProps } from '@/components/OverhangCard';
import { SimpleCard } from '@/components/SimpleCard';
import {
  Heading,
  Text,
  type HeadingType,
  type TextAlignType,
} from '@/components/Typography';
import * as styles from './BasicCard.styles';

type CardContentProps = {
  hasImage?: boolean;
  superheadline?: string;
  headline?: string;
  body?: React.ReactNode;
  ctaLink?: React.ReactNode;
  largeHeading?: boolean;
  isSansHeading?: boolean;
  textAlign?: TextAlignType;
  headingLevel?: HeadingType;
  isDarkText?: boolean;
}

const CardContent = ({
  hasImage,
  superheadline,
  headline,
  body,
  ctaLink,
  largeHeading,
  isSansHeading,
  textAlign = 'left',
  headingLevel = 'h3',
  isDarkText,
}: CardContentProps) => (
  <>
    {superheadline && (
      <Text
        uppercase
        weight="semibold"
        tracking="wider"
        align={textAlign}
        color={isDarkText ? 'black' : 'white'}
        className={hasImage ? styles.superheadHasImage : styles.superhead}
      >
        {superheadline}
      </Text>
    )}
    {headline && (
      <Heading
        as={headingLevel}
        size={3}
        font={isSansHeading ? 'sans' : 'serif'}
        tracking="normal"
        weight={isSansHeading ? 'semibold' : 'bold'}
        align={textAlign}
        color={isDarkText ? 'black' : 'white'}
        mb="07em"
        className={styles.heading(largeHeading)}
      >
        {headline}
      </Heading>
    )}
    {body}
    {ctaLink && <div className={styles.ctaWrapper}>{ctaLink}</div>}
  </>
);

type BasicCardProps = OverhangCardProps & Omit<CardContentProps, 'isDarkText'> & {
  largeCardPadding?: boolean;
  isVertical?: boolean;
};

export const BasicCard = ({
  superheadline,
  headline,
  body,
  ctaLink,
  filename,
  alt,
  focus,
  aspectRatio = '1x1',
  visibleHorizontal,
  visibleVertical,
  isVertical = true,
  bgColor = 'white',
  largeHeading,
  isSansHeading,
  largeCardPadding,
  textAlign = 'left',
  headingLevel = 'h3',
  ...props
}: BasicCardProps) => {
  const hasImage = !!filename;
  const isDarkText = bgColor === 'white';
  /**
   * Color contrast of white text on palo verde background is 3.5:1 which is insufficient for small text
   * If palo verde is chosen as background color, use palo verde dark instead (4.91:1 contrast ratio)
   */
  const a11yBgColor = bgColor === 'palo-verde' ? 'palo-verde-dark' : bgColor;

  // If there is no image, horizontal and vertical orientations should look exactly the same
  if (!hasImage) {
    return (
      <SimpleCard {...props} bgColor={a11yBgColor} className={styles.rootNoImage(largeCardPadding)}>
        <div className={styles.contentNoImage}>
          <CardContent
            hasImage={hasImage}
            superheadline={superheadline}
            headline={headline}
            body={body}
            ctaLink={ctaLink}
            largeHeading={largeHeading}
            isSansHeading={isSansHeading}
            textAlign={textAlign}
            headingLevel={headingLevel}
            isDarkText={isDarkText}
          />
        </div>
      </SimpleCard>
    );
  }

  const displaySquareThumbnail = aspectRatio === '1x1' && !isVertical;

  return (
    <OverhangCard
      {...props}
      bgColor={a11yBgColor}
      filename={filename}
      alt={alt}
      focus={focus}
      visibleHorizontal={visibleHorizontal}
      visibleVertical={visibleVertical}
      imageSize={displaySquareThumbnail ? 'thumbnail' : 'large-card'}
      aspectRatio={aspectRatio}
      largeCardPadding={largeCardPadding}
      imageWrapperClassName={styles.imageWrapper(isVertical, aspectRatio)}
      className={styles.roothasImage(isVertical, largeCardPadding)}
    >
      <div className={styles.contentHasImage(isVertical, largeCardPadding)}>
        <CardContent
          hasImage={hasImage}
          superheadline={superheadline}
          headline={headline}
          body={body}
          ctaLink={ctaLink}
          largeHeading={largeHeading}
          isSansHeading={isSansHeading}
          textAlign={textAlign}
          headingLevel={headingLevel}
          isDarkText={isDarkText}
        />
      </div>
    </OverhangCard>
  );
};
