export const fontFamilies = {
  sans: 'font-sans',
  serif: 'font-serif',
};

export const fontWeights = {
  normal: 'font-normal',
  semibold: 'font-semibold',
  bold: 'font-bold',
};

// Modular and fluid typography from Decanter
export const fontSizes = {
  base: 'type-0',
  1: 'type-1',
  2: 'type-2',
  3: 'type-3',
  4: 'type-4',
  5: 'type-5',
  6: 'type-6',
  7: 'type-7',
  8: 'type-8',
  9: 'type-9',
  'f0': 'fluid-type-0',
  'f1': 'fluid-type-1',
  'f2': 'fluid-type-2',
  'f3': 'fluid-type-3',
  'f4': 'fluid-type-4',
  'f5': 'fluid-type-5',
  'f6': 'fluid-type-6',
  'f7': 'fluid-type-7',
  'f8': 'fluid-type-8',
  'f9': 'fluid-type-9',
};

// Line heights
export const fontLeadings = {
  none: 'leading-none', // 1
  tight: 'leading-tight', // 1.1
  display: 'leading-display', // 1.2
  snug: 'leading-snug', // 1.3
  cozy: 'leading-cozy', // 1.4
  normal: 'leading', // 1.5
};

// Letter spacing
export const fontTrackings = {
  tighter: 'tracking-tighter', // -0.05em
  tight: 'tracking-tight', // -0.025em
  normal: 'tracking-normal', // 0
  wide: 'tracking-wide', // 0.025em
  wider: 'tracking-wider', // 0.05em
  widest: 'tracking-widest', // 0.1em
};

export const textAligns = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};

export const textColors = {
  default: '', // Inherit from the base
  black: 'text-black',
  white: 'text-white',
  'cool-grey': 'text-cool-grey',
  'black-70': 'text-black-70', // For caption
  'digital-red': 'text-digital-red',
};

// Variants already include font size generally so either use the variant or the size prop
export const textVariants = {
  none: '', // Use default base/inherited style
  /**
   * Decanter typography styles
   */
  big: 'big-paragraph',
  subheading: 'subheading',
  caption: 'caption',
  card: 'card-paragraph',
  intro: 'intro-text',
  'base23': 'basefont-23',
};

export const icon = 'inline-block';
