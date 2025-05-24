/**
 *
 * @param aspectRatioStr - The aspect ratio string in the format "widthxheight" (e.g., "3x2").
 * @returns The aspect ratio as a number (e.g., 1.5 for "3x2").
 */

export const getAspectRatioNumber = (aspectRatioStr: string) => {
  const aspectRatioNumbers = aspectRatioStr.split('x').map(Number);

  return aspectRatioNumbers[0] / aspectRatioNumbers[1];
};
