import { OverhangCard, type OverhangCardProps } from '@/components/OverhangCard';
import {
  Heading,
  Text,
  type HeadingType,
  type TextAlignType,
} from '@/components/Typography';


type BasicCardProps = OverhangCardProps & {
  superheadline?: string;
  headline?: string;
  body?: React.ReactNode;
  ctaLink?: React.ReactNode;
  largeHeading?: boolean;
  isSansHeading?: boolean;
  largeCardPadding?: boolean;
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
  largeHeading = false,
  isSansHeading = false,
  largeCardPadding = false,
  textAlign = 'left',
  headingLevel = 'h3',
  ...props
}: BasicCardProps) => {
  const displaySquareThumbnail = aspectRatio === '1x1' && orientation === 'horizontal';

  return (
    <OverhangCard
      {...props}
      orientation={orientation}
      bgColor={bgColor}
      filename={filename}
      alt={alt}
      focus={focus}
      visibleHorizontal={visibleHorizontal}
      visibleVertical={visibleVertical}
      imageSize={displaySquareThumbnail ? 'thumbnail' : 'large-card'}
      aspectRatio={aspectRatio}
      className={`bg-${bgColor} ${largeCardPadding ? 'p-8' : 'p-6'}`}
    >
      {superheadline && (
        <Text uppercase weight="semibold" tracking="wider" className="text-09em mb-[1.6em] -mt-04em">
          {superheadline}
        </Text>
      )}
      {headline && (
        <Heading
          as={headingLevel}
          size={largeHeading ? 2 : 4}
          font={isSansHeading ? 'sans' : 'serif'}
          weight={isSansHeading ? 'semibold' : 'bold'}
          align={textAlign}
          className="mb-4"
        >
          {headline}
        </Heading>
      )}
      {body && <div className="mb-4">{body}</div>}
      {ctaLink && <div className="mt-4">{ctaLink}</div>}
    </OverhangCard>
  );
};
