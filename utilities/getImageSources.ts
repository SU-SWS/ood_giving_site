import { getProcessedImage } from '@/utilities/getProcessedImage';
import { getAspectRatioNumber } from '@/utilities/getAspectRatioNumber';

type ResponsiveBreakpointType = {
  cropWidth: number;
  minWidth: number;
};

type ImageSourceType = {
  srcSet: string;
  media: string;
};

// Default breakpoints for generating responsive images
const defaultResponsiveBreakpoints: ResponsiveBreakpointType[] = [
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
 * @param imageFocus - Optional focus point for cropping
 * @param aspectRatio - Optional aspect ratio string (e.g., "16x9")
 * @param targetCropWidth - Optional maximum crop width to limit the largest generated image
 * @param customBreakpoints - Optional custom breakpoints to override defaults
 * @returns Array of image sources with srcSet and media queries
 */
export const getImageSources = (
  filename: string,
  originalWidth: number,
  imageFocus?: string,
  aspectRatio?: string,
  targetCropWidth?: number,
  customBreakpoints?: ResponsiveBreakpointType[],
): ImageSourceType[] => {
  const sources: ImageSourceType[] = [];
  const breakpoints = customBreakpoints || defaultResponsiveBreakpoints;
  const aspectRatioDecimal = !!aspectRatio ? getAspectRatioNumber(aspectRatio) : undefined;

  // Filter breakpoints to not exceed targetCropWidth if specified
  const filteredBreakpoints = targetCropWidth
    ? breakpoints.filter(bp => bp.cropWidth <= targetCropWidth)
    : breakpoints;

  // If the original image width is < 2000px, find out what breakpoint range it falls into
  const largestBp = filteredBreakpoints.find(bp => originalWidth >= bp.minWidth && originalWidth < bp.cropWidth);

  // If we found an appropriate breakpoint, insert the original image at that breakpoint
  // For example, if the original image is 1100px, it will be used for the min-width: 992px breakpoint
  if (largestBp) {
    sources.push({
      srcSet: getProcessedImage(filename), // Original size
      media: `(min-width: ${largestBp.minWidth}px)`,
    });
  }

  // Add all smaller sizes that are relevant
  filteredBreakpoints
    // First pass: always include the mobile size, and keep all the breakpoints with minWidth <= the original image width
    .filter(bp => bp.cropWidth <= originalWidth || bp.cropWidth === 460)
    // If the original image is wider than 2000px (no largestBp assigned), keep all the breakpoints from the first pass
    // Otherwise, keep only the breakpoints that are smaller than the largestBp
    .filter(bp => !largestBp || bp.minWidth < largestBp.minWidth)
    .forEach(bp => {
      const cropSize = !!aspectRatio ? `${bp.cropWidth}x${Math.round(bp.cropWidth / aspectRatioDecimal)}` : `${bp.cropWidth}x0`;

      sources.push({
        srcSet: getProcessedImage(filename, cropSize, imageFocus),
        // The smaller source uses max-width while the larger uses min-width for the media attribute
        media: bp.minWidth > 0 ? `(min-width: ${bp.minWidth}px)` : `(max-width: ${bp.cropWidth}px)`,
      });
    });

  return sources;
};
