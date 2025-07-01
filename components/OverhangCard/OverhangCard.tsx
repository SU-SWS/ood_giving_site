import { cnb } from 'cnbuilder';
import { AspectRatioImage, type AspectRatioImageProps } from '@/components/Image';
import { type CardBgColorType } from '@/utilities/datasource';

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

  return (
    <div className={cnb('shadow-md', isVertical && 'mt-80', className)} {...props}>
      {filename && (
        <div className={isVertical ? '-mt-80' : '-mt-80'}>
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
      )}
      {children}
    </div>
  );
};
