import { cnb } from 'cnbuilder';
import { getProcessedImage } from '@/utilities/getProcessedImage';
import { getSbImageSize } from '@/utilities/getSbImageSize';
import { type SbImageType } from '@/components/Storyblok/Storyblok.types';
import * as styles from './Image.styles';

export type AspectRatioImageProps = SbImageType & React.HTMLAttributes<HTMLImageElement> & {
  classPrefix?: string;
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

  // Get image dimensions
  const { width: originalWidth, height: originalHeight } = getSbImageSize(filename);
  const defaultCropWidth = 1000;
  const aspectRatioNumbers = aspectRatio.split('x').map(Number);
  const aspectRatioDecimal = aspectRatioNumbers[0] / aspectRatioNumbers[1];

  const cropWidth = imageSize || originalWidth > 1000
    ? (styles.aspectImageSizes[imageSize] || defaultCropWidth) : originalWidth;
  const cropHeight = Math.round(cropWidth / aspectRatioDecimal);

  /**
   * Set the effective image focus from the visibleHorizontal and visibleVertical props, if actual image focus is not set manually in the image.
   * If image focus is set manually in Storyblok in the image, it will override the values calculated from the visibleHorizotal and visibleVertical props.
   */
  const focusX = !focus && styles.imageFocusHorizontal(originalWidth)[visibleHorizontal || 'center'];
  const focusY = !focus && styles.imageFocusVertical(originalHeight)[visibleVertical || 'top'];

  //  If image focus is set manually in Storyblok in the image, it overrides the values calculated from the visibleHorizotal and visibleVertical props.
  const cropFocus = focus || `${focusX}x${focusY}:${focusX + 1}x${focusY + 1}`;

  // Process the image based on size comparison
  // For gallery-slide, we always process it regardless of original size
  const processedImg = (imageSize === 'gallery-slide' || originalWidth > cropWidth)
    ? getProcessedImage(filename, `${cropWidth}x${cropHeight}`, cropFocus)
    : getProcessedImage(filename, '', cropFocus);

  return (
    <div
      className={cnb(
        'su-media su-media--image ood-media',
        `ood-media--${aspectRatio}`,
        classPrefix && `${classPrefix}__media`,
        className,
      )}
    >
      <img
        className={cnb(
          'ood-media__image object-cover',
          styles.imageAspectRatios[aspectRatio],
          classPrefix && `${classPrefix}__image`,
        )}
        width={cropWidth}
        height={cropHeight}
        src={processedImg}
        alt={alt || ''}
      />
    </div>
  );
};
