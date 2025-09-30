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
  card: 600,
  header: 800,
  'horizontal-card': 800,
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
export type ImageAspectRatioType = '1x1' | '1x2' | '2x1' | '2x3' | '3x2' | '3x4' | '4x3' | '5x8' | '8x5' | '9x16' | '10x3' | '16x9';

// 2XL and up >= 1500px
export const imageCropsDesktop = {
  '1x1': '1400x1400', // We rarely have square or portrait images edge to edge so they can be smaller than the viewport size
  '1x2': '1000x2000',
  '2x1': '2000x1000',
  '2x3': '1200x1800',
  '3x2': '2100x1400',
  '3x4': '1500x2000',
  '4x3': '2000x1500',
  '5x8': '1000x1600',
  '8x5': '2000x1250',
  '9x16': '900x1600',
  '10x3': '2000x600',
  '16x9': '2000x1125',
};
export type ImageCropType = keyof typeof imageCropsDesktop;

// LG-XL - 992px - 1499px
export const imageCropsSmallDesktop = {
  '1x1': '1000x1000',
  '1x2': '1000x2000',
  '2x1': '1500x750',
  '2x3': '1200x1800',
  '3x2': '1500x1000',
  '3x4': '1200x1600',
  '4x3': '1600x1200',
  '5x8': '1000x1600',
  '8x5': '1600x1000',
  '9x16': '900x1600',
  '10x3': '1500x450',
  '16x9': '1600x900',
};

// SM-MD - 576px - 991px
export const imageCropsTablet = {
  '1x1': '1000x1000',
  '1x2': '1000x2000',
  '2x1': '1000x500',
  '2x3': '1000x1500',
  '3x2': '1000x667',
  '3x4': '1000x1333',
  '4x3': '1000x750',
  '5x8': '1000x1600',
  '8x5': '1000x625',
  '9x16': '900x1600',
  '10x3': '1000x300',
  '16x9': '1000x563',
};

// XS - up to 575px
export const imageCropsMobile = {
  '1x1': '600x600',
  '1x2': '600x1200',
  '2x1': '600x300',
  '2x3': '600x900',
  '3x2': '600x400',
  '3x4': '600x800',
  '4x3': '600x450',
  '5x8': '600x960',
  '8x5': '640x400',
  '9x16': '630x1120',
  '10x3': '600x180',
  '16x9': '640x360',
};

export const image = 'size-full object-cover';
