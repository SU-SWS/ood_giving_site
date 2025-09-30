import { useMemo } from 'react';
import { getProcessedImage } from '@/utilities/getProcessedImage';
import { getImageSources } from '@/utilities/getImageSources';
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
  imageSize,
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

  const targetCropWidth = imageSize ? styles.aspectImageSizes[imageSize] : originalWidth;

  // Only generate srcset for larger images (800px and up), otherwise just use a single image src
  const createSourceSet = targetCropWidth >= 800;

  // Get corresponding image sources for responsive images
  const imageSources = useMemo(() => {
    return getImageSources(filename, imageFocus, aspectRatio, targetCropWidth);
  }, [filename, imageFocus, aspectRatio, targetCropWidth]);

  const { cropHeight, cropWidth } = useMemo(() => {
    // E.g. '3x2' => 1.5
    const aspectRatioDecimal = getAspectRatioNumber(aspectRatio);

    const cropWidth = originalWidth > targetCropWidth ? targetCropWidth : originalWidth;
    const cropHeight = Math.round(cropWidth / aspectRatioDecimal);

    return { cropWidth, cropHeight };
  }, [aspectRatio, originalWidth, targetCropWidth]);

  if (!filename) {
    return null;
  }

  const processedImg = getProcessedImage(filename, `${cropWidth}x${cropHeight}`, imageFocus);

  return (
    <>
      {createSourceSet ? (
        <picture>
          {imageSources.map((source) => (
            <source
              key={source.srcSet}
              srcSet={source.srcSet}
              media={source.media}
            />
          ))}
          <img
            {...imageProps}
            width={imageSources[0]?.width}
            height={imageSources[0]?.height}
            src={imageSources[0]?.srcSet}
            fetchPriority={fetchPriority}
            loading={loading}
            alt={alt || ''}
            className={className}
          />
        </picture>
      ) : (
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
      )}
    </>
  );
};
