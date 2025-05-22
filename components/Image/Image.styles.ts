/**
 * AspectRatioImage styles
 */

export const aspectImageSizes = {
  card: 600,
  thumbnail: 400,
  'horizontal-card': 800,
  'large-card': 800,
  header: 800,
  'gallery-slide': 1400,
  default: 1000,
};
export type AspectRatioImageSizeType = keyof typeof aspectImageSizes;

export const imageFocusHorizontal = (imgWidth: number) => ({
  left: 1,
  center: imgWidth / 2,
  right: imgWidth - 1,
});
export type VisibleHorizontalType = 'left' | 'center' | 'right';

export const imageFocusVertical = (imgHeight: number) => ({
  top: 1,
  center: imgHeight / 2,
  bottom: imgHeight - 1,
});
export type VisibleVerticalType = 'top' | 'center' | 'bottom';

/**
 * StoryImage styles
 */

export const imageAspectRatios = {
  '1x1': 'aspect-1',
  '3x2': 'aspect-[3/2]',
  '16x9': 'aspect-[16/9]',
  free: '',
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
export const StoryImageWidths = {
  'su-w-full': 'w-full',
  'centered-container': 'cc',
  'su-w-story': 'flex-lg-8-of-12',
  'su-w-inset': 'flex-sm-10-of-12 flex-md-8-of-12 flex-lg-7-of-12 flex-xl-6-of-12 flex-2xl-5-of-12',
  'fit-container': 'w-full',
};
export type StoryImageWidthType = keyof typeof StoryImageWidths;

export const image = 'size-full object-cover';
