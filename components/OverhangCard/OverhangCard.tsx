import { cnb } from 'cnbuilder';
import { AspectRatioImage, type AspectRatioImageProps } from '@/components/Image';
import { type CardBgColorType } from '@/utilities/datasource';
import * as styles from './OverhangCard.styles';

export type OverhangCardProps = AspectRatioImageProps & React.HTMLAttributes<HTMLDivElement> & {
  orientation?: 'vertical' | 'horizontal';
  bgColor?: CardBgColorType;
};

export const OverhangCard = ({
  orientation = 'vertical',
  bgColor = 'white',
  filename,
  alt,
  focus,
  visibleHorizontal,
  visibleVertical,
  imageSize = 'default',
  aspectRatio = '3x2',
  children,
  className,
  ...props
}: OverhangCardProps) => {
  const isVertical = orientation === 'vertical' || !orientation;
  const hasImage = !!filename;

  return (
    <div className={cnb(styles.root(isVertical, hasImage, bgColor), className)} {...props}>
      <div className={styles.imageWrapper(isVertical, hasImage)}>
        {filename && (
          <AspectRatioImage
            filename={filename}
            alt={alt}
            focus={focus}
            visibleHorizontal={visibleHorizontal}
            visibleVertical={visibleVertical}
            imageSize={imageSize}
            aspectRatio={aspectRatio}
            className="hidden md:block"
          />
        )}
        {children}
      </div>
    </div>
  );
};
