import { useMemo } from 'react';
import { getAspectRatioNumber } from '@/utilities/getAspectRatioNumber';
import { getProcessedImage } from '@/utilities/getProcessedImage';
import { getSbImageSize } from '@/utilities/getSbImageSize';
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

  if (!filename) {
    return null;
  }

  const aspectRatioNumber = getAspectRatioNumber(aspectRatio);
  const desktopCropSize = styles.imageCropsDesktop[aspectRatio];
  const desktopCropWidth = parseInt(desktopCropSize.split('x')[0], 10);

  const largestWidth = imageSize ? styles.aspectImageSizes[imageSize] : desktopCropWidth;
  const largestHeight = Math.round(largestWidth / aspectRatioNumber);
  const largestCropString = `${largestWidth}x${largestHeight}`;

  return (
    <>
      {!imageSize ? (
        <picture>
          {originalWidth >= desktopCropWidth && (
            <source
              srcSet={getProcessedImage(filename, largestCropString, imageFocus)}
              media="(min-width: 1500px)"
            />
          )}
          <source
            srcSet={getProcessedImage(filename, styles.imageCropsSmallDesktop[aspectRatio], imageFocus)}
            media="(min-width: 992px)"
          />
          <source
            srcSet={getProcessedImage(filename, styles.imageCropsTablet[aspectRatio], imageFocus)}
            media="(min-width: 576px)"
          />
          <source
            srcSet={getProcessedImage(filename, styles.imageCropsMobile[aspectRatio], imageFocus)}
            media="(max-width: 575px)"
          />
          <img
            {...imageProps}
            width={largestWidth || ''}
            height={largestHeight || ''}
            src={getProcessedImage(filename, largestCropString, imageFocus)}
            fetchPriority={fetchPriority}
            loading={loading}
            alt={alt || ''}
            className={className}
          />
        </picture>
      ) : (
        <img
          {...imageProps}
          width={largestWidth}
          height={largestHeight}
          src={getProcessedImage(filename, largestCropString, imageFocus)}
          fetchPriority={fetchPriority}
          loading={loading}
          alt={alt || ''}
          className={className}
        />
      )}
    </>
  );
};
