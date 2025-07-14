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

export const imageAspectRatios = {
  '1x1': 'aspect-1',
  '3x2': 'aspect-[3/2]',
  '16x9': 'aspect-[16/9]',
};
export type ImageAspectRatioType = keyof typeof imageAspectRatios;

// 2XL and up >= 1500px
export const imageCropsDesktop = {
  '1x1': '2000x2000',
  '3x2': '2100x1400',
  '16x9': '2000x1125',
  'free': '2000x0',
};
export type ImageCropType = keyof typeof imageCropsDesktop;

// LG-XL - 992px - 1499px
export const imageCropsSmallDesktop = {
  '1x1': '1000x1000',
  '3x2': '1500x1000',
  '16x9': '1600x900',
  'free': '1500x0',
};

// SM-MD - 576px - 991px
export const imageCropsTablet = {
  '1x1': '1000x1000',
  '3x2': '1000x667',
  '16x9': '1000x563',
  'free': '1000x0',
};

// XS - up to 575px
export const imageCropsMobile = {
  '1x1': '600x600',
  '3x2': '600x400',
  '16x9': '640x360',
  'free': '600x0',
};

// Image Width (from Storyblok)
export const storyImageWidths = {
  'su-w-full': '', // This is labeled as the edge-to-edge option
  'centered-container': '',
  'su-w-story': 'lg:basis-8/12',
  'su-w-inset': 'sm:basis-10/12 md:basis-8/12 lg:basis-7/12 lg:basis-6/12 2xl:basis-5/12',
  'fit-container': '',
};
export type StoryImageWidthType = keyof typeof storyImageWidths;

export const image = 'size-full object-cover';
