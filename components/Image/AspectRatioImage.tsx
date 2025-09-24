import { useMemo } from 'react';
import { getProcessedImage } from '@/utilities/getProcessedImage';
import { getSbImageSize } from '@/utilities/getSbImageSize';
import { getAspectRatioNumber } from '@/utilities/getAspectRatioNumber';
import { visiblePositionToFocus } from '@/utilities/visiblePositionToFocus';
import { type SbImageType } from '@/components/Storyblok/Storyblok.types';
import * as styles from './Image.styles';

export type AspectRatioImageProps = SbImageType & React.HTMLAttributes<HTMLImageElement> & {
  visibleVertical?: styles.VisibleVerticalType;
  visibleHorizontal?: styles.VisibleHorizontalType;
  imageSize?: styles.AspectRatioImageSizeType;
  aspectRatio?: styles.ImageAspectRatioType;
  fetchPriority?: 'low' | 'high' | 'auto';
  loading?: 'eager' | 'lazy';
};

export const AspectRatioImage = ({
  filename,
  alt,
  focus,
  imageSize = 'default',
  aspectRatio = '3x2',
  visibleHorizontal,
  visibleVertical,
  fetchPriority,
  loading = fetchPriority === 'high' ? 'eager' : 'lazy',
  className,
  ...imageProps
}: AspectRatioImageProps) => {
  const { width: originalWidth, height: originalHeight } = getSbImageSize(filename);

  const imageFocus = useMemo(() => {
    // If manual focus is provided, use it directly
    if (focus) return focus;

    // Otherwise calculate focus from visibility parameters
    return visiblePositionToFocus(originalWidth, originalHeight, visibleHorizontal, visibleVertical);
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

  const processedImg = getProcessedImage(filename, `${cropWidth}x${cropHeight}`, imageFocus);

  return (
    <img
      {...imageProps}
      width={cropWidth}
      height={cropHeight}
      src={processedImg}
      fetchPriority={fetchPriority}
      loading={loading}
      alt={alt || ''}
      className={className}
    />
  );
};
