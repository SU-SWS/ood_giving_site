import { OverhangCard, type OverhangCardProps } from '@/components/OverhangCard';
import {
  Heading,
  Text,
  type HeadingType,
  type TextAlignType,
} from '@/components/Typography';
import * as styles from './BasicCard.styles';

type BasicCardProps = OverhangCardProps & {
  superheadline?: string;
  headline?: string;
  body?: React.ReactNode;
  ctaLink?: React.ReactNode;
  largeHeading?: boolean;
  isSansHeading?: boolean;
  textAlign?: TextAlignType;
  headingLevel?: HeadingType;
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
  orientation = 'vertical',
  bgColor = 'white',
  largeHeading,
  isSansHeading,
  largeCardPadding,
  textAlign = 'left',
  headingLevel = 'h3',
  ...props
}: BasicCardProps) => {
  const displaySquareThumbnail = aspectRatio === '1x1' && orientation === 'horizontal';
  const isDarkText = bgColor === 'white';

  /**
   * Color contrast of white text on palo verde background is 3.5:1 which is insufficient for small text
   * If palo verde is chosen as background color, use palo verde dark instead (4.91:1 contrast ratio)
   */
  const a11yBgColor = bgColor === 'palo-verde' ? 'palo-verde-dark' : bgColor;

  return (
    <OverhangCard
      {...props}
      orientation={orientation}
      bgColor={a11yBgColor}
      filename={filename}
      alt={alt}
      focus={focus}
      visibleHorizontal={visibleHorizontal}
      visibleVertical={visibleVertical}
      imageSize={displaySquareThumbnail ? 'thumbnail' : 'large-card'}
      aspectRatio={aspectRatio}
      largeCardPadding={largeCardPadding}
      className=""
    >
      <div className={styles.content(largeCardPadding)}>
        {superheadline && (
          <Text
            uppercase
            weight="semibold"
            tracking="wider"
            align={textAlign}
            color={isDarkText ? 'black' : 'white'}
            className="text-09em mb-16 -mt-4"
          >
            {superheadline}
          </Text>
        )}
        {headline && (
          <Heading
            as={headingLevel}
            size={largeHeading ? 4 : 2}
            font={isSansHeading ? 'sans' : 'serif'}
            tracking="normal"
            weight={isSansHeading ? 'semibold' : 'bold'}
            align={textAlign}
            color={isDarkText ? 'black' : 'white'}
            mb="06em"
            className="-mt-02em text-pretty"
          >
            {headline}
          </Heading>
        )}
        {body}
        {ctaLink && <div className="rs-mt-1 mb-6">{ctaLink}</div>}
      </div>
    </OverhangCard>
  );
};
