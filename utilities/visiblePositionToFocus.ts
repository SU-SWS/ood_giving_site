import {
  imageFocusHorizontal, imageFocusVertical, type VisibleHorizontalType, type VisibleVerticalType,
} from '@/components/Image/Image.styles';

/**
 * Calculates the effective image focus for a Storyblok image based on visibility parameters from datasource
 * for cropping images using the Storyblok image service.
 *
 * @param {number} originalWidth - Original width of the image
 * @param {number} originalHeight - Original height of the image
 * @param {VisibleHorizontalType} visibleHorizontal - Horizontal focus position (left, center, right)
 * @param {VisibleVerticalType} visibleVertical - Vertical focus position (top, center, bottom)
 * @returns {string | undefined} - Focus point in Storyblok format "100x200:101x201" or undefined
 */
export const visiblePositionToFocus = (
  originalWidth: number,
  originalHeight: number,
  visibleHorizontal?: VisibleHorizontalType,
  visibleVertical?: VisibleVerticalType,
): string | undefined => {
  // If image dimensions are invalid, can't calculate focus
  if (originalWidth <= 2 || originalHeight <= 2) return undefined;

  // Get horizontal and vertical focus positions
  const focusX = imageFocusHorizontal(originalWidth)[visibleHorizontal || 'center'];
  const focusY = imageFocusVertical(originalHeight)[visibleVertical || 'top'];

  // Return formatted focus string for Storyblok image service
  return `${focusX}x${focusY}:${focusX + 1}x${focusY + 1}`;
};
