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
  hasLink?: boolean; // If true, the card has hover/focus styles
  bgColor?: AllCardBgColorType;
  largeCardPadding?: boolean;
  imageWrapperClassName?: string; // Custom classes for the image wrapper
};

export const OverhangCard = ({
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
  imageWrapperClassName,
  className,
  ...props
}: OverhangCardProps) => {
  const isDarkBg = !!bgColor && bgColor !== 'white' && bgColor !== 'fog-light';

  return (
    <FlexBox
      {...props}
      as="article"
      className={cnb(styles.root(hasLink, bgColor, isDarkBg), className)}
    >
      <div className={cnb(styles.imageWrapper, imageWrapperClassName)}>
        <AspectRatioImage
          filename={filename}
          alt={alt}
          focus={focus}
          visibleHorizontal={visibleHorizontal}
          visibleVertical={visibleVertical}
          imageSize={imageSize}
          aspectRatio={aspectRatio}
          className={styles.image(hasLink)}
        />
      </div>
      {children}
    </FlexBox>
  );
};
