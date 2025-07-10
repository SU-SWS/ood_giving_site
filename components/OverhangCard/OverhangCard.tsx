import { cnb } from 'cnbuilder';
import { AspectRatioImage, type AspectRatioImageProps } from '@/components/Image';
import { FlexBox } from '@/components/FlexBox';
import { type AllCardBgColorType } from '@/utilities/datasource';
import * as styles from './OverhangCard.styles';

/**
 * This card component has an image that extends outside the content container.
 * Used as a base for Basic, Tile, Quote and Story cards with image.
 */
export type OverhangCardProps = AspectRatioImageProps & React.HTMLAttributes<HTMLDivElement> & {
  variant: styles.OverhangCardVariantType;
  isVertical?: boolean;
  hasLink?: boolean; // If true, the card has hover/focus styles
  bgColor?: AllCardBgColorType;
  largeCardPadding?: boolean;
};

export const OverhangCard = ({
  variant,
  isVertical = true,
  hasLink,
  bgColor = 'white',
  filename,
  alt,
  focus,
  visibleHorizontal,
  visibleVertical,
  imageSize = 'large-card',
  aspectRatio = '3x2',
  largeCardPadding,
  children,
  className,
  ...props
}: OverhangCardProps) => {
  return (
    <FlexBox
      as="article"
      // direction={isVertical ? 'col' : 'row'}
      className={cnb(styles.root(variant, isVertical, hasLink, largeCardPadding, bgColor), className)}
      {...props}
    >
      <div className={styles.imageWrapper(isVertical, variant, aspectRatio)}>
        <AspectRatioImage
          filename={filename}
          alt={alt}
          focus={focus}
          visibleHorizontal={visibleHorizontal}
          visibleVertical={visibleVertical}
          imageSize={imageSize}
          aspectRatio={aspectRatio}
        />
      </div>
      {children}
    </FlexBox>
  );
};
