// XL and up - 1200px +
export const imageCropsDesktop = {
  '1x1': '1000x1000',
  '2x3': '1000x1500',
  '3x2': '1020x680',
  '3x4': '1020x1360',
  '4x3': '1000x750',
  '9x16': '900x1600',
  '16x9': '1040x585',
  'free': '1000x0',
};
export type ImageCropType = keyof typeof imageCropsDesktop;

// SM-LG - 576px - 1199px
export const imageCropsTablet = {
  '1x1': '800x800',
  '2x3': '800x1200',
  '3x2': '900x600',
  '3x4': '900x1200',
  '4x3': '800x600',
  '9x16': '810x1440',
  '16x9': '800x450',
  'free': '800x0',
};

// XS - up to 575px
export const imageCropsMobile = {
  '1x1': '600x600',
  '2x3': '600x900',
  '3x2': '600x400',
  '3x4': '600x800',
  '4x3': '600x450',
  '9x16': '630x1120',
  '16x9': '640x360',
  'free': '600x0',
};

// Image Width (from Storyblok)
export const StoryImageWidths = {
  'su-w-full': 'w-full',
  'centered-container': 'cc',
  'su-w-story': '',
  'su-w-inset': 'inset',
  'fit-container': 'w-full',
};
export type StoryImageWidthType = keyof typeof StoryImageWidths;

export const image = 'size-full object-cover';
