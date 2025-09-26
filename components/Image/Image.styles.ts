import { cnb } from 'cnbuilder';

export type VisibleHorizontalType = 'left' | 'center' | 'right';
export type VisibleVerticalType = 'top' | 'center' | 'bottom';

/**
 * FullWidthImage styles
 */

export const objectPositions = (
  visibleHorizontal: VisibleHorizontalType = 'center',
  visibleVertical: VisibleVerticalType = 'top',
) => cnb(
  {
    'object-left-top': visibleHorizontal === 'left' && visibleVertical === 'top',
    'object-top': visibleHorizontal === 'center' && visibleVertical === 'top',
    'object-right-top': visibleHorizontal === 'right' && visibleVertical === 'top',
    'object-left': visibleHorizontal === 'left' && visibleVertical === 'center',
    'object-center': visibleHorizontal === 'center' && visibleVertical === 'center',
    'object-right': visibleHorizontal === 'right' && visibleVertical === 'center',
    'object-left-bottom': visibleHorizontal === 'left' && visibleVertical === 'bottom',
    'object-bottom': visibleHorizontal === 'center' && visibleVertical === 'bottom',
    'object-right-bottom': visibleHorizontal === 'right' && visibleVertical === 'bottom',
  },
);

/**
 * AspectRatioImage styles
 */

export const aspectImageSizes = {
  default: 1000,
  card: 600,
  header: 800,
  'horizontal-card': 800,
  'gallery-slide': 1400,
  'large-card': 800,
  thumbnail: 400,
};
export type AspectRatioImageSizeType = keyof typeof aspectImageSizes;

export const imageFocusHorizontal = (imgWidth: number) => ({
  left: 1,
  center: Math.round(imgWidth / 2),
  right: imgWidth - 1,
});

export const imageFocusVertical = (imgHeight: number) => ({
  top: 1,
  center: Math.round(imgHeight / 2),
  bottom: imgHeight - 1,
});


/**
 * StoryImage styles
 */
export type ImageAspectRatioType = '1x1' | '1x2' | '2x1' | '2x3' | '3x2' | '3x4' | '4x3' | '5x8' | '8x5' | '9x16' | '10x3' | '16x9' | 'free';

export const image = 'size-full object-cover';
