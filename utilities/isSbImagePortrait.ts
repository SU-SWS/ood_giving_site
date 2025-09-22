import { getSbImageSize } from '@/utilities/getSbImageSize';

/**
 * Determines if a Storyblok image is in portrait orientation.
 *
 * @param imageSrc - The URL of the Storyblok image.
 * @returns A boolean indicating whether the image is in portrait orientation.
 */
export const isSbImagePortrait = (imageSrc: string) => {
  const { width, height } = getSbImageSize(imageSrc);
  return height > width;
};
