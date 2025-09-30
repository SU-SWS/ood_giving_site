import { getProcessedImage } from './getProcessedImage';
import { getSbImageSize } from './getSbImageSize';

type ResponsiveBreakpointType = {
  cropWidth: number;
  minWidth: number;
};

type ImageSourceType = {
  srcSet: string;
  media: string;
};

// Default breakpoints for generating responsive images
const srcsetBreakpoints: ResponsiveBreakpointType[] = [
  { cropWidth: 2000, minWidth: 1500 },
  { cropWidth: 1500, minWidth: 1200 },
  { cropWidth: 1200, minWidth: 992 },
  { cropWidth: 1000, minWidth: 576 },
  { cropWidth: 600, minWidth: 0 }, // Mobile/smallest size
];

/**
 * Generates responsive image sources for use with picture element
 *
 * @param filename - The image filename from Storyblok
 * @returns Array of image sources with srcSet and media queries
 */
export const getImageSources = (
  filename: string,
  // customBreakpoints?: ResponsiveBreakpointType[],
): ImageSourceType[] => {
  const sources: ImageSourceType[] = [];
  const { width: originalWidth } = getSbImageSize(filename);

  // If the original image width is < 2000px, find out what breakpoint range it falls into
  const largestBp = srcsetBreakpoints.find(bp => originalWidth >= bp.minWidth && originalWidth < bp.cropWidth);

  // If we found an appropriate breakpoint, insert the original image at that breakpoint
  // For example, if the original image is 1100px, it will be used for the min-width: 992px breakpoint
  if (largestBp) {
    sources.push({
      srcSet: getProcessedImage(filename), // Original size
      media: `(min-width: ${largestBp.minWidth}px)`,
    });
  }

  // Add all smaller sizes that are relevant
  srcsetBreakpoints
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
};
