import { useMemo } from 'react';
import { cnb } from 'cnbuilder';
import { getProcessedImage } from '@/utilities/getProcessedImage';
import { getSbImageSize } from '@/utilities/getSbImageSize';
import { getAspectRatioNumber } from '@/utilities/getAspectRatioNumber';
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
  imageSize = 'default',
  aspectRatio = '3x2',
  visibleHorizontal,
  visibleVertical,
  className,
  ...imageProps
}: AspectRatioImageProps) => {
  const { width: originalWidth, height: originalHeight } = getSbImageSize(filename);

  const cropFocus = useMemo(() => {
    // If image focus is set manually in Storyblok in the image, use it
    if (focus) return focus;

    // Set the effective image focus from the visibleHorizontal and visibleVertical props
    const focusX = styles.imageFocusHorizontal(originalWidth)[visibleHorizontal || 'center'];
    const focusY = styles.imageFocusVertical(originalHeight)[visibleVertical || 'top'];

    return `${focusX}x${focusY}:${focusX + 1}x${focusY + 1}`;
  }, [focus, originalWidth, originalHeight, visibleHorizontal, visibleVertical]);

  const { cropHeight, cropWidth } = useMemo(() => {
    const targetCropWidth = styles.aspectImageSizes[imageSize];

    // E.g. '3x2' => 1.5
    const aspectRatioDecimal = getAspectRatioNumber(aspectRatio);

    const cropWidth = originalWidth > targetCropWidth ? targetCropWidth : originalWidth;
    const cropHeight = Math.round(cropWidth / aspectRatioDecimal);

    return { cropWidth, cropHeight };
  }, [aspectRatio, imageSize, originalWidth]);

  if (!filename) {
    return null;
  }

  const processedImg = getProcessedImage(filename, `${cropWidth}x${cropHeight}`, cropFocus);

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
          'ood-media__image',
          styles.imageAspectRatios[aspectRatio],
          classPrefix && `${classPrefix}__image`,
        )}
        width={cropWidth}
        height={cropHeight}
        src={processedImg}
        alt={alt || ''}
        {...imageProps}
      />
    </div>
  );
};
