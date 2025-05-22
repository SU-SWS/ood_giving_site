import { cnb } from 'cnbuilder';
import { getProcessedImage } from '@/utilities/getProcessedImage';
import { getSbImageSize } from '@/utilities/getSbImageSize';
import { type SbImageType } from '@/components/Storyblok/Storyblok.types';
import * as styles from './Image.styles';

export type AspectRatioImageProps = SbImageType & React.HTMLAttributes<HTMLImageElement> & {
  // blok: SbBlokData;
  // element?: string;
  classPrefix?: string;
  // otherClasses?: string;
  visibleVertical?: styles.VisibleVerticalType;
  visibleHorizontal?: styles.VisibleHorizontalType;
  imageSize?: styles.AspectRatioImageSizeType;
  aspectRatio?: styles.ImageAspectRatioType;
};

export const AspectRatioImage = ({
  filename,
  alt,
  focus,
  classPrefix,
  imageSize,
  aspectRatio = '3x2',
  visibleHorizontal,
  visibleVertical,
  className,
  ...props
}: AspectRatioImageProps) => {
  if (!filename) {
    return null;
  }

  let processedImg = '';
  const { width: originalWidth, height: originalHeight } = getSbImageSize(filename);

  // Get the appropriate width limit based on imageSize
  const minImageWidth = styles.aspectImageSizes[imageSize || 'default'];

  // Only scale image if original image size is larger than intended size
  if (originalWidth > minImageWidth) {
    processedImg = getProcessedImage(filename, `${minImageWidth}x0`);
  } else {
    processedImg = getProcessedImage(filename, '');
  }

  return (
    <div
      className={`su-media su-media--image ood-media ood-media--${
        aspectRatio
      }
            ${classPrefix ? `${classPrefix}__media` : ''}${
        className ? ` ${className}` : ''
      }`}
    >
      <img
        className={cnb('ood-media__image object-cover', styles.imageAspectRatios[aspectRatio], classPrefix ? `${classPrefix}__image` : '')}
            //visibleHorizontal ? `su-obj-position-h-${visibleHorizontal}` : 'su-obj-position-h-center',
            //su-obj-position-h-${visibleHorizontal ?? 'center'}-v-${
          //visibleVertical ?? 'top'
        src={processedImg}
        alt={alt || ''}
        {...props}
      />
    </div>
  );
};
