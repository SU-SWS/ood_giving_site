import { type FontSizeType } from '@/components/Typography';

export const lightPageBgColors = {
  white: 'bg-white',
  'fog-light': 'bg-fog-light',
};
export type LightPageBgColorType = keyof typeof lightPageBgColors;

export const darkBgColors = {
  'bay-dark': 'bg-bay-dark',
  'palo-alto': 'bg-palo-alto',
  'palo-alto-dark': 'bg-palo-alto-dark',
  'palo-verde-dark': 'bg-palo-verde-dark',
  'lagunita': 'bg-lagunita',
  'lagunita-dark': 'bg-lagunita-dark',
  'sky-dark': 'bg-sky-dark',
  'cardinal-red': 'bg-cardinal-red',
  'digital-red': 'bg-digital-red',
  'black': 'bg-black',
  'fog-light': 'bg-fog-light',
  'cardinal-dark-to-spirited-dark': 'bg-gradient-to-tr from-cardinal-red-dark to-spirited-dark',
  'plum-to-digital-red': 'bg-gradient-to-tr from-plum to-digital-red',
  'plum-to-spirited-dark': 'bg-gradient-to-tr from-plum to-spirited-dark',
  'palo-alto-dark-to-palo-verde-dark': 'bg-gradient-to-tr from-palo-alto-dark to-palo-verde-dark',
  'sky-dark-to-olive-dark': 'bg-gradient-to-tr from-sky-dark to-olive-dark',
  'sky-dark-to-bay-dark': 'bg-gradient-to-tr from-sky-dark to-bay-dark',
  'palo-verde': 'bg-palo-verde',
  'plum': 'bg-plum',
  'brick': 'bg-brick',
};
export type DarkBgColorType = keyof typeof darkBgColors;

export const bgColors = {
  ...lightPageBgColors,
  ...darkBgColors,
};
export type BgColorType = LightPageBgColorType | DarkBgColorType;

// This is slightly different from darkBgColors
export const cardBgColors = {
  'white': 'bg-white',
  'bay-dark': 'bg-bay-dark',
  'palo-alto': 'bg-palo-alto',
  'palo-alto-dark': 'bg-palo-alto-dark',
  'palo-verde': 'bg-palo-verde',
  'palo-verde-dark': 'bg-palo-verde-dark',
  'lagunita': 'bg-lagunita',
  'plum': 'bg-plum',
  'lagunita-dark': 'bg-lagunita-dark',
  'sky-dark': 'bg-sky-dark',
  'digital-red': 'bg-digital-red',
  'cardinal-red': 'bg-cardinal-red',
  'brick': 'bg-brick',
  'cardinal-dark-to-spirited-dark': 'bg-gradient-to-tr from-cardinal-red-dark to-spirited-dark',
  'plum-to-digital-red': 'bg-gradient-to-tr from-plum to-digital-red',
  'plum-to-spirited-dark': 'bg-gradient-to-tr from-plum to-spirited-dark',
  'palo-alto-dark-to-palo-verde-dark': 'bg-gradient-to-tr from-palo-alto-dark to-palo-verde-dark',
  // This item in the Colors: Card background datasource has an extra whitespace at the end
  'sky-dark-to-olive-dark ': 'bg-gradient-to-tr from-sky-dark to-olive-dark',
  'sky-dark-to-olive-dark': 'bg-gradient-to-tr from-sky-dark to-olive-dark',
  'sky-dark-to-bay-dark': 'bg-gradient-to-tr from-sky-dark to-bay-dark',
};
export type CardBgColorType = keyof typeof cardBgColors;

export const allCardBgColors = {
  ...cardBgColors,
  ...darkBgColors,
  ...lightPageBgColors,
};
export type AllCardBgColorType = CardBgColorType | DarkBgColorType | LightPageBgColorType;

const gradientBorderBase = '[border-image-slice:1]';

export const borderColors = {
  white: 'border-white',
  'bay-dark': 'border-bay-dark',
  'palo-alto': 'border-palo-alto',
  'palo-alto-dark': 'border-palo-alto-dark',
  'palo-verde-dark': 'border-palo-verde-dark',
  'lagunita': 'border-lagunita',
  'lagunita-dark': 'border-lagunita-dark',
  'sky-dark': 'border-sky-dark',
  'cardinal-red': 'border-cardinal-red',
  'digital-red': 'border-digital-red',
  'black': 'border-black',
  'fog-light': 'border-fog-light',
  'cardinal-dark-to-spirited-dark': `${gradientBorderBase} [border-image-source:linear-gradient(to_top_right,#820000,#C74632)]`,
  'plum-to-digital-red': `${gradientBorderBase} [border-image-source:linear-gradient(to_top_right,#620059,#B1040E)]`,
  'plum-to-spirited-dark': `${gradientBorderBase} [border-image-source:linear-gradient(to_top_right,#620059,#C74632)]`,
  'palo-alto-dark-to-palo-verde-dark': `${gradientBorderBase} [border-image-source:linear-gradient(to_top_right,#014240,#017E7C)]`,
  'sky-dark-to-olive-dark': `${gradientBorderBase} [border-image-source:linear-gradient(to_top_right,#016895,#7A863B)]`,
  'sky-dark-to-bay-dark': `${gradientBorderBase} [border-image-source:linear-gradient(to_top_right,#016895,#417865)]`,
  'palo-verde': 'border-palo-verde',
  'plum': 'border-plum',
  'brick': 'border-brick',
};
export type BorderColorType = keyof typeof borderColors;

// For pseudo elements like tabs above headings
export const darkBeforeColors = {
  'bay-dark': 'before:bg-bay-dark',
  'palo-alto': 'before:bg-palo-alto',
  'palo-alto-dark': 'before:bg-palo-alto-dark',
  'palo-verde-dark': 'before:bg-palo-verde-dark',
  'lagunita': 'before:bg-lagunita',
  'lagunita-dark': 'before:bg-lagunita-dark',
  'sky-dark': 'before:bg-sky-dark',
  'cardinal-red': 'before:bg-cardinal-red',
  'digital-red': 'before:bg-digital-red',
  'black': 'before:bg-black',
  'fog-light': 'before:bg-fog-light',
  'cardinal-dark-to-spirited-dark': 'before:bg-gradient-to-tr before:from-cardinal-red-dark before:to-spirited-dark',
  'plum-to-digital-red': 'before:bg-gradient-to-tr before:from-plum before:to-digital-red',
  'plum-to-spirited-dark': 'before:bg-gradient-to-tr before:from-plum before:to-spirited-dark',
  'palo-alto-dark-to-palo-verde-dark': 'before:bg-gradient-to-tr before:from-palo-alto-dark before:to-palo-verde-dark',
  'sky-dark-to-olive-dark': 'before:bg-gradient-to-tr before:from-sky-dark before:to-olive-dark',
  'sky-dark-to-bay-dark': 'before:bg-gradient-to-tr before:from-sky-dark before:to-bay-dark',
  'palo-verde': 'before:bg-palo-verde',
  'plum': 'before:bg-plum',
  'brick': 'before:bg-brick',
};
export type DarkBeforeColorType = keyof typeof darkBeforeColors;

export const lightBeforeColors = {
  'bay-light': 'before:bg-bay-light',
  'palo-alto': 'before:bg-palo-alto',
  'palo-alto-light': 'before:bg-palo-alto-light',
  'palo-verde-light': 'before:bg-palo-verde-light',
  'lagunita-light': 'before:bg-lagunita-light',
  'sky-light': 'before:bg-sky-light',
  'digital-red': 'before:bg-digital-red',
  'cardinal-red': 'before:bg-cardinal-red',
  'white': 'before:bg-white',
};
export type LightBeforeColorType = keyof typeof lightBeforeColors;

export const gradientOverlays = {
  none: '',
  'su-gradient-black-bottom': 'bg-gradient-to-t from-black-true/40 via-40% to-80%',
  'su-gradient-black-top': 'bg-gradient-to-b from-black-true/40 via-40% to-80%',
};
export type GradientOverlayType = keyof typeof gradientOverlays;

export const paddingTops = {
  none: '',
  base: 'rs-pt-0',
  1: 'rs-pt-1',
  2: 'rs-pt-2',
  3: 'rs-pt-3',
  4: 'rs-pt-4',
  5: 'rs-pt-5',
  6: 'rs-pt-6',
  7: 'rs-pt-7',
  8: 'rs-pt-8',
  9: 'rs-pt-9',
  10: 'rs-pt-10',
};

export const paddingBottoms = {
  none: '',
  base: 'rs-pb-0',
  1: 'rs-pb-1',
  2: 'rs-pb-2',
  3: 'rs-pb-3',
  4: 'rs-pb-4',
  5: 'rs-pb-5',
  6: 'rs-pb-6',
  7: 'rs-pb-7',
  8: 'rs-pb-8',
  9: 'rs-pb-9',
  10: 'rs-pb-10',
};

export const paddingVerticals = {
  none: '',
  base: 'rs-py-0',
  1: 'rs-py-1',
  2: 'rs-py-2',
  3: 'rs-py-3',
  4: 'rs-py-4',
  5: 'rs-py-5',
  6: 'rs-py-6',
  7: 'rs-py-7',
  8: 'rs-py-8',
  9: 'rs-py-9',
  10: 'rs-py-10',
};
export type PaddingType = keyof typeof paddingTops;

// Add other margins as needed. Used for spacing between elements.
export const marginVerticals = {
  none: 'my-0',
  '01em': 'my-01em',
  '02em': 'my-02em',
  '03em': 'my-03em',
  '04em': 'my-04em',
  '05em': 'my-05em',
  '06em': 'my-06em',
  '07em': 'my-07em',
  '08em': 'my-08em',
  '09em': 'my-09em',
  '1em': 'my-1em',
  base: 'rs-my-0',
  1: 'rs-my-1',
  2: 'rs-my-2',
  3: 'rs-my-3',
  4: 'rs-my-4',
  5: 'rs-my-5',
  6: 'rs-my-6',
  7: 'rs-my-7',
  8: 'rs-my-8',
  9: 'rs-my-9',
  10: 'rs-my-10',
};

/**
 * Legacy modular typography sizes
 * Add more as needed
 */
export const modTypeSizes: Record<string, FontSizeType> = {
  'su-mod-type-3': 3,
  'su-mod-type-4': 4,
  'su-mod-type-5': 5,
  'su-mod-type-6': 6,
};
export type ModTypeSizeTypes = keyof typeof modTypeSizes;

/**
 * Small margin values in em units useful for adding to typography elements
 */
export const smallMarginTops = {
  none: 'mt-0',
  '01em': 'mt-01em',
  '02em': 'mt-02em',
  '03em': 'mt-03em',
  '04em': 'mt-04em',
  '05em': 'mt-05em',
  '06em': 'mt-06em',
  '07em': 'mt-07em',
  '08em': 'mt-08em',
  '09em': 'mt-09em',
  '1em': 'mt-1em',
};

/**
 * Larger Decanter responsive spacing values useful for adding to larger layout elements
 */
export const largeMarginTops = {
  none: 'mt-0',
  base: 'rs-mt-0',
  1: 'rs-mt-1',
  2: 'rs-mt-2',
  3: 'rs-mt-3',
  4: 'rs-mt-4',
  5: 'rs-mt-5',
  6: 'rs-mt-6',
  7: 'rs-mt-7',
  8: 'rs-mt-8',
  9: 'rs-mt-9',
  10: 'rs-mt-10',
};

export const marginTops = {
  ...smallMarginTops,
  ...largeMarginTops,
};

export const smallMarginBottoms = {
  none: 'mb-0',
  '01em': 'mb-01em',
  '02em': 'mb-02em',
  '03em': 'mb-03em',
  '04em': 'mb-04em',
  '05em': 'mb-05em',
  '06em': 'mb-06em',
  '07em': 'mb-07em',
  '08em': 'mb-08em',
  '09em': 'mb-09em',
  '1em': 'mb-1em',
};

export const largeMarginBottoms = {
  none: 'mb-0',
  base: 'rs-mb-0',
  1: 'rs-mb-1',
  2: 'rs-mb-2',
  3: 'rs-mb-3',
  4: 'rs-mb-4',
  5: 'rs-mb-5',
  6: 'rs-mb-6',
  7: 'rs-mb-7',
  8: 'rs-mb-8',
  9: 'rs-mb-9',
  10: 'rs-mb-10',
};
// Type common for both top and bottom margins since the keys are the same
export type LargeMarginType = keyof typeof largeMarginBottoms;

export const marginBottoms = {
  ...smallMarginBottoms,
  ...largeMarginBottoms,
};
export type MarginType = keyof typeof marginBottoms;
