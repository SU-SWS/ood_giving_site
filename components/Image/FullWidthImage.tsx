import { useMemo } from 'react';
import { cnb } from 'cnbuilder';
import { getProcessedImage } from '@/utilities/getProcessedImage';
import { getSbImageSize } from '@/utilities/getSbImageSize';
import { getImageSources } from '@/utilities/getImageSources';
import { type SbImageType } from '@/components/Storyblok/Storyblok.types';
import * as styles from './Image.styles';

export type FullWidthImageProps = SbImageType & React.HTMLAttributes<HTMLImageElement> & {
  classPrefix?: string;
  visibleVertical?: styles.VisibleVerticalType;
  visibleHorizontal?: styles.VisibleHorizontalType;
};

// Define breakpoints for generating responsive images
const responsiveBreakpoints = [
  { cropWidth: 2000, minWidth: 1500 },
  { cropWidth: 1500, minWidth: 1200 },
  { cropWidth: 1200, minWidth: 992 },
  { cropWidth: 1000, minWidth: 768 },
  { cropWidth: 800, minWidth: 461 },
  { cropWidth: 460, minWidth: 0 }, // Mobile/smallest size
];

export const FullWidthImage = ({
  filename,
  alt,
  classPrefix,
  visibleHorizontal,
  visibleVertical,
  className,
}: FullWidthImageProps) => {
  const { width: originalWidth, height: originalHeight } = getSbImageSize(filename);

 // Find corresponding image sizes for responsive images
  const imageSources = useMemo(() => {
    const sources = [];

    // If the original image width is < 2000px, find out what breakpoint range it falls into
    const largestBp = responsiveBreakpoints.find(bp => originalWidth >= bp.minWidth && originalWidth < bp.cropWidth);

    // If we found an appropriate breakpoint, insert the original image at that breakpoint
    // For example, if the original image is 1100px, it will be used for the min-width: 992px breakpoint
    if (largestBp) {
      sources.push({
        srcSet: getProcessedImage(filename), // Original size
        media: `(min-width: ${largestBp.minWidth}px)`,
        width: originalWidth,
        height: originalHeight,
      });
    }

    // Add all smaller sizes that are relevant
    responsiveBreakpoints
      // First pass: always include the mobile size, and keep all the breakpoints with minWidth < the original image width
      .filter(bp => bp.cropWidth < originalWidth || bp.cropWidth === 460)
      // If the original image is wider than 2000px (no largestBp assigned), keep all the breakpoints from the first pass
      // Otherwise, keep only the breakpoints that are smaller than the largestBp
      .filter(bp => !largestBp || bp.minWidth < largestBp.minWidth)
      .forEach(bp => {
        const cropSize = `${bp.cropWidth}x0`;

        sources.push({
          srcSet: getProcessedImage(filename, cropSize),
          // The smaller source uses max-width while the larger uses min-width for the media attribute
          media: bp.minWidth > 0 ? `(min-width: ${bp.minWidth}px)` : `(max-width: ${bp.cropWidth}px)`,
        });
      });

    return sources;
  }, [originalWidth, filename, originalHeight]);

  return (
    <div className={cnb('su-media', classPrefix && `${classPrefix}__media`, className)}>
      <picture>
        {imageSources.map(({ width, srcSet, media }) => (
          <source
            key={`source-${width}`}
            srcSet={srcSet}
            media={media}
          />
        ))}
        <img
          src={imageSources[0].srcSet} // Use the first source as the default image
          alt={alt || ''}
          width={originalWidth}
          height={originalHeight}
          className={cnb(
            'size-full object-cover',
            styles.objectPositions(visibleHorizontal, visibleVertical),
            classPrefix && `${classPrefix}__image`)
          }
        />
      </picture>
    </div>
  );
};

