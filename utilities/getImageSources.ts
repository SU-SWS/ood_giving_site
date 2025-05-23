import { getProcessedImage } from './getProcessedImage';

export type ResponsiveBreakpoint = {
  cropWidth: number;
  minWidth: number;
};

export type ImageSource = {
  srcSet: string;
  media: string;
  width?: number;
  height?: number;
};

// Define standard breakpoints for generating responsive images
const defaultResponsiveBreakpoints: ResponsiveBreakpoint[] = [
  { cropWidth: 2000, minWidth: 1500 },
  { cropWidth: 1500, minWidth: 1200 },
  { cropWidth: 1200, minWidth: 992 },
  { cropWidth: 1000, minWidth: 768 },
  { cropWidth: 800, minWidth: 461 },
  { cropWidth: 460, minWidth: 0 }, // Mobile/smallest size
];

/**
 * Generates responsive image sources for use with picture element
 *
 * @param filename - The image filename from Storyblok
 * @param originalWidth - Original width of the image
 * @param originalHeight - Original height of the image
 * @param imageFocus - Optional focus point for image cropping
 * @param customBreakpoints - Optional custom breakpoints to override defaults
 * @returns Array of image sources with srcSet and media queries
 */
export const getImageSources = (
  filename: string,
  originalWidth: number,
  originalHeight: number,
  imageFocus?: string,
  customBreakpoints?: ResponsiveBreakpoint[],
): ImageSource[] => {
  const sources: ImageSource[] = [];
  const breakpoints = customBreakpoints || defaultResponsiveBreakpoints;

  // If the original image width is < 2000px, find out what breakpoint range it falls into
  const largestBp = breakpoints.find(bp => originalWidth >= bp.minWidth && originalWidth < bp.cropWidth);

  // If we found an appropriate breakpoint, insert the original image at that breakpoint
  // For example, if the original image is 1100px, it will be used for the min-width: 992px breakpoint
  if (largestBp) {
    sources.push({
      srcSet: getProcessedImage(filename, '', imageFocus), // Original size
      media: `(min-width: ${largestBp.minWidth}px)`,
      width: originalWidth,
      height: originalHeight,
    });
  }

  // Add all smaller sizes that are relevant
  breakpoints
    // First pass: always include the mobile size, and keep all the breakpoints with minWidth < the original image width
    .filter(bp => bp.cropWidth < originalWidth || bp.cropWidth === 460)
    // If the original image is wider than 2000px (no largestBp assigned), keep all the breakpoints from the first pass
    // Otherwise, keep only the breakpoints that are smaller than the largestBp
    .filter(bp => !largestBp || bp.minWidth < largestBp.minWidth)
    .forEach(bp => {
      const cropSize = `${bp.cropWidth}x0`;

      sources.push({
        srcSet: getProcessedImage(filename, cropSize, imageFocus),
        // The smaller source uses max-width while the larger uses min-width for the media attribute
        media: bp.minWidth > 0 ? `(min-width: ${bp.minWidth}px)` : `(max-width: ${bp.cropWidth}px)`,
        width: bp.cropWidth,
        height: Math.round(bp.cropWidth * (originalHeight / originalWidth)), // Maintain aspect ratio
      });
    });

  return sources;
};
