import { getSbImageSize } from '@/utilities/getSbImageSize';
import { getProcessedImage } from '@/utilities/getProcessedImage';
import { getAspectRatioNumber } from '@/utilities/getAspectRatioNumber';

type ResponsiveBreakpointType = {
  cropWidth: number;
  minWidth: number;
};

type ImageSourceType = {
  srcSet: string;
  media: string;
  width?: number;
  height?: number;
};

// Default breakpoints for generating responsive images
const defaultResponsiveBreakpoints: ResponsiveBreakpointType[] = [
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
 * @param imageFocus - Optional focus point for cropping
 * @param aspectRatio - Optional aspect ratio string (e.g., "16x9")
 * @param targetCropWidth - Optional maximum crop width to limit the largest generated image
 * @param customBreakpoints - Optional custom breakpoints to override defaults
 * @returns Array of image sources with srcSet and media queries
 */
export const getImageSources = (
  filename: string,
  imageFocus?: string,
  aspectRatio?: string,
  targetCropWidth?: number,
  customBreakpoints?: ResponsiveBreakpointType[],
): ImageSourceType[] => {
  const sources: ImageSourceType[] = [];
  const { width: originalWidth } = getSbImageSize(filename);
  const aspectRatioDecimal = aspectRatio ? getAspectRatioNumber(aspectRatio) : undefined;
  const smallestBreakpoint = 600;

  // When targetCropWidth is specified and original is larger, generate custom breakpoints
  // that include all standard sizes smaller than target, with the largest being the target itself
  let breakpoints = defaultResponsiveBreakpoints;
  if (!breakpoints && targetCropWidth && originalWidth > targetCropWidth) {
    const standardSizes = [2000, 1500, 1200, 1000, 800, 600];
    const relevantSizes = standardSizes.filter(size => size <= targetCropWidth);

    // Ensure the targetCropWidth is included as the largest size
    if (!relevantSizes.includes(targetCropWidth)) {
      relevantSizes.unshift(targetCropWidth);
    }

    // Convert sizes to breakpoints with min-width as the next smaller size (or 0 for the smallest)
    breakpoints = relevantSizes.map((size, index) => ({
      cropWidth: size,
      minWidth: relevantSizes[index + 1] ?? 0,
    }));
  }

  // Filter breakpoints by target width if specified
  const filteredBreakpoints = targetCropWidth
    ? breakpoints.filter(bp => bp.cropWidth <= targetCropWidth)
    : breakpoints;

  // If the original image width is < 2000px, find out what breakpoint range it falls into
  const largestBp = filteredBreakpoints.find(
    bp => originalWidth >= bp.minWidth && originalWidth < bp.cropWidth,
  );

  // If we found an appropriate breakpoint, insert the original image at that breakpoint
  // For example, if the original image is 1100px, it will be used for the min-width: 992px breakpoint
  if (largestBp) {
    sources.push({
      srcSet: getProcessedImage(filename), // Original size
      media: `(min-width: ${largestBp.minWidth}px)`,
    });
  }

  // Add all smaller sizes that are relevant
  // First pass: always include the mobile size, and keep all the breakpoints with cropWidth <= the original image width
  // If the original image is wider than 2000px (no largestBp assigned), keep all the breakpoints from the first pass
  // Otherwise, keep only the breakpoints that are smaller than the largestBp
  const relevantBreakpoints = filteredBreakpoints
    .filter(bp => bp.cropWidth <= originalWidth || bp.cropWidth === smallestBreakpoint)
    .filter(bp => !largestBp || bp.minWidth < largestBp.minWidth);

  relevantBreakpoints.forEach(bp => {
    const cropHeight = aspectRatioDecimal ? Math.round(bp.cropWidth / aspectRatioDecimal) : 0;
    const cropSize = `${bp.cropWidth}x${cropHeight}`;

    sources.push({
      srcSet: getProcessedImage(filename, cropSize, imageFocus),
      // The smaller source uses max-width while the larger uses min-width for the media attribute
      media: bp.minWidth > 0 ? `(min-width: ${bp.minWidth}px)` : `(max-width: ${bp.cropWidth}px)`,
      width: bp.cropWidth,
      height: cropHeight,
    });
  });

  return sources;
};
