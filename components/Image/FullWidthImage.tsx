import { useMemo } from 'react';
import { cnb } from 'cnbuilder';
import { getProcessedImage } from '@/utilities/getProcessedImage';
import { getSbImageSize } from '@/utilities/getSbImageSize';
import { type SbImageType } from '@/components/Storyblok/Storyblok.types';
import * as styles from './Image.styles';

export type FullWidthImageProps = SbImageType & React.HTMLAttributes<HTMLImageElement> & {
  classPrefix?: string;
  visibleVertical?: styles.VisibleVerticalType;
  visibleHorizontal?: styles.VisibleHorizontalType;
};

export const FullWidthImage = ({
  filename,
  alt,
  focus,
  classPrefix,
  visibleHorizontal,
  visibleVertical,
  className,
  ...imageProps
}: FullWidthImageProps) => {
  const { width: originalWidth, height: originalHeight } = getSbImageSize(filename);
  const originalAspectRatio = originalWidth / originalHeight;

  // let largeImg,
  //   mediumImg,
  //   smallImg,
  //   originalImg = '';
  // let imgSrcset,
  //   imgSizes,
  //   imgSrc = '';

  // if (filename != null) {
  //   let imgWidth = 0;

  //   // Get image width from URL of storyblok image
  //   if (filename?.startsWith('http')) {
  //     imgWidth = parseInt(filename.split('/')[5].split('x')[0], 10) || 0;
  //   }

  //   originalImg = getProcessedImage(filename, '');

  //   if (imgWidth >= 800) {
  //     smallImg = getProcessedImage(filename, '800x0');
  //   }

  //   if (imgWidth >= 1200) {
  //     mediumImg = getProcessedImage(filename, '1200x0');
  //   }

  //   if (imgWidth >= 2000) {
  //     largeImg = getProcessedImage(filename, '2000x0');
  //   }

  //   imgSrcset = smallImg ? smallImg + ' 800w' : '';
  //   imgSrcset += mediumImg ? ',' + mediumImg + ' 1200w ' : '';
  //   imgSrcset += largeImg ? ',' + largeImg + ' 2000w ' : '';

  //   // Include the original image in the srcset if its width is > 800px and < 2000px
  //   if (imgWidth > 800 && imgWidth < 2000) {
  //     imgSrcset += originalImg ? ',' + originalImg + ' ' + imgWidth + 'w ' : '';
  //   }

  //   // Set sizes attribute only if imgSrcset is not empty (imgSrcset is empty if image width is < 800px)
  //   if (imgSrcset) {
  //     imgSizes = '100vw';
  //   }

  //   // If image is > 2000px, use the resized 2000px version for the src. Otherwise use original image.
  //   imgSrc = largeImg || originalImg;
  // }

  return (
    <div className={cnb('su-media', classPrefix && `${classPrefix}__media`, className)}>
      <picture>
        {originalWidth > 2000 && (
          <source
            srcSet={getProcessedImage(filename, `2000x${Math.round(2000 / originalAspectRatio)}`)}
            media="(min-width: 1500px)"
          />
        )}
        {originalWidth > 1500 && (
          <source
            srcSet={getProcessedImage(filename, `1500x${Math.round(1500 / originalAspectRatio)}`)}
            media="(min-width: 1200px)"
          />
        )}
        {originalWidth > 1200 && (
          <source
            srcSet={getProcessedImage(filename, `1200x${Math.round(1200 / originalAspectRatio)}`)}
            media="(min-width: 992px)"
          />
        )}
        {originalWidth > 1000 && (
          <source
            srcSet={getProcessedImage(filename, `1000x${Math.round(1000 / originalAspectRatio)}`)}
            media="(min-width: 768px)"
          />
        )}
        {originalWidth > 800 && (
          <source
            srcSet={getProcessedImage(filename, `800x${Math.round(800 / originalAspectRatio)}`)}
            media="(min-width: 461px)"
          />
        )}
        <source
          srcSet={getProcessedImage(filename, `460x${Math.round(460 / originalAspectRatio)}`)}
          media="(max-width: 460px)"
        />
        <img
          {...imageProps}
          src={getProcessedImage(filename, `2000x${Math.round(2000 / originalAspectRatio)}`)}
          alt={alt || ''}
          width={2000}
          height={1000}
          className={cnb('size-full object-cover', classPrefix && `${classPrefix}__image`)}
        />
      </picture>
    </div>
  );
};

