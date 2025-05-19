import { type FontSizeType } from '@/components/Typography';

export const ctaLinkStyles = {
  'ood-cta__button--primary su-after-bg-white': 'bg-bay-dark text-white hocus:bg-palo-alto hocus:text-white hocus:after:bg-white after:bg-white',
  'ood-cta__button--secondary su-after-bg-bay-dark su-after-bg-hocus-white': 'bg-white text-bay-dark shadow-bay-dark shadow-[inset_0_0_0_1px] after:text-bay-dark after:bg-bay-dark hocus:bg-bay-dark hocus:text-white hocus:after:text-white hocus:after:bg-white',
  'su-bg-digital-red su-bg-hocus-plum-dark su-text-white su-text-hocus-white su-after-bg-white su-after-bg-hocus-white': 'bg-digital-red hocus:bg-plum-dark text-white hocus:text-white after:bg-white hocus:after:bg-white',
  'su-bg-white su-bg-hocus-plum-dark su-text-digital-red su-text-hocus-white su-after-bg-digital-red su-after-bg-hocus-white': 'bg-white hocus:bg-plum-dark text-digital-red hocus:text-white after:bg-digital-red hocus:after:bg-white',
  'ood-cta__button--ghost su-after-bg-white': 'text-white bg-transparent shadow-white shadow-[inset_0_0_0_1px] transition-shadow hocus:text-white hocus:shadow-[inset_0_0_0_3px] after:bg-white hocus:after:bg-white',
  'su-bg-plum su-bg-hocus-plum-dark su-text-white su-text-hocus-white su-after-bg-white su-after-bg-hocus-white': 'bg-plum hocus:bg-plum-dark text-white hocus:text-white after:bg-white hocus:after:bg-white',
  'su-bg-cardinal-dark-to-spirited-dark su-bg-hocus-plum-dark su-text-white su-text-hocus-white su-after-bg-white su-after-bg-hocus-white su-transition-none': 'from-cardinal-dark to-spirited-dark hocus:bg-plum-dark text-white hocus:text-white after:bg-white hocus:after:bg-white transition-none',
  'su-bg-plum-to-digital-red su-bg-hocus-plum-dark su-text-white su-text-hocus-white su-after-bg-white su-after-bg-hocus-white su-transition-none': 'from-plum to-digital-red hocus:bg-plum-dark text-white hocus:text-white after:bg-white hocus:after:bg-white transition-none',
  'su-bg-plum-to-spirited-dark su-bg-hocus-plum-dark su-text-white su-text-hocus-white su-after-bg-white su-after-bg-hocus-white su-transition-none': 'from-plum to-spirited-dark hocus:bg-plum-dark text-white hocus:text-white after:bg-white hocus:after:bg-white transition-none',
  'su-bg-palo-alto-dark-to-palo-verde-dark su-bg-hocus-plum-dark su-text-white su-text-hocus-white su-after-bg-white su-after-bg-hocus-white su-transition-none': 'from-palo-alto-dark to-palo-verde-dark hocus:bg-plum-dark text-white hocus:text-white after:bg-white hocus:after:bg-white transition-none',
  'su-bg-sky-dark-to-olive-dark su-bg-hocus-plum-dark su-text-white su-text-hocus-white su-after-bg-white su-after-bg-hocus-white su-transition-none': 'from-sky-dark to-olive-dark hocus:bg-plum-dark text-white hocus:text-white after:bg-white hocus:after:bg-white transition-none',
  'su-bg-sky-dark-to-bay-dark su-bg-hocus-plum-dark su-text-white su-text-hocus-white su-after-bg-white su-after-bg-hocus-white su-transition-none': 'from-sky-dark to-bay-dark hocus:bg-plum-dark text-white hocus:text-white after:bg-white hocus:after:bg-white transition-none',
};

export type CtaLinkStylesType = keyof typeof ctaLinkStyles;

export const ctaLinkColors = {
  'su-text-digital-red su-after-bg-digital-red su-text-hocus-sky-dark su-after-bg-hocus-sky-dark': 'text-digital-red after:bg-digital-red hocus:text-sky-dark hocus:after:bg-sky-dark',
  'su-text-white su-text-hocus-white su-hocus-underline su-after-bg-white su-after-bg-hocus-white': 'text-white hocus:text-white hocus:underline after:bg-white hocus:after:bg-white',
  'ood-cta__link-gradient su-bg-sky-dark-to-bay-dark su-after-bg-sky-dark-to-bay-dark': 'bg-clip-text from-sky-dark to-bay-dark after:from-sky-dark after:to-bay-dark',
  'ood-cta__link-gradient su-bg-cardinal-dark-to-spirited-dark su-after-bg-cardinal-dark-to-spirited-dark': 'bg-clip-text from-cardinal-dark to-spirited-dark after:from-cardinal-dark after:to-spirited-dark',
  'ood-cta__link-gradient su-bg-plum-to-digital-red su-after-bg-plum-to-digital-red': 'bg-clip-text from-plum to-digital-red after:from-plum after:to-digital-red',
  'ood-cta__link-gradient su-bg-plum-to-spirited-dark su-after-bg-plum-to-spirited-dark': 'bg-clip-text from-plum to-spirited-dark after:from-plum after:to-spirited-dark',
  'ood-cta__link-gradient su-bg-palo-alto-dark-to-palo-verde-dark su-after-bg-palo-alto-dark-to-palo-verde-dark': 'bg-clip-text from-palo-alto-dark to-palo-verde-dark after:from-palo-alto-dark after:to-palo-verde-dark',
  'ood-cta__link-gradient su-bg-sky-dark-to-olive-dark su-after-bg-sky-dark-to-olive-dark': 'bg-clip-text from-sky-dark to-olive-dark after:from-sky-dark after:to-olive-dark',
  // TODO: Has an extra su-after-bg-sky-dark-to-bay-dark in SB
  'ood-cta__link-gradient su-bg-sky-dark-to-bay-dark': 'bg-clip-text from-sky-dark to-bay-dark',
  'su-text-lagunita-dark su-after-bg-lagunita-dark su-text-hocus-plum-dark su-after-bg-hocus-plum-dark': 'text-lagunita-dark after:bg-lagunita-dark hocus:text-plum-dark hocus:after:bg-plum-dark',
  'su-text-palo-verde su-after-bg-palo-verde su-text-hocus-plum-dark su-after-bg-hocus-plum-dark': 'text-palo-verde after:bg-palo-verde hocus:text-plum-dark hocus:after:bg-plum-dark',
  'su-text-plum su-after-bg-plum su-text-hocus-plum-dark su-after-bg-hocus-plum-dark': 'text-plum after:bg-plum hocus:text-plum-dark hocus:after:bg-plum-dark',
  'su-text-brick su-after-bg-brick su-text-hocus-plum-dark su-after-bg-hocus-plum-dark': 'text-brick after:bg-brick hocus:text-plum-dark hocus:after:bg-plum-dark',
  'su-text-cardinal-red su-after-bg-cardinal-red su-text-hocus-plum-dark su-after-bg-hocus-plum-dark': 'text-cardinal-red after:bg-cardinal-red hocus:text-plum-dark hocus:after:bg-plum-dark',
  'su-text-palo-alto su-after-bg-palo-alto su-text-hocus-plum-dark su-after-bg-hocus-plum-dark': 'text-palo-alto after:bg-palo-alto hocus:text-plum-dark hocus:after:bg-plum-dark',
  'su-text-bay-dark su-after-bg-bay-dark su-text-hocus-plum-dark su-after-bg-hocus-plum-dark': 'text-bay-dark after:bg-bay-dark hocus:text-plum-dark hocus:after:bg-plum-dark',
  'su-text-sky-dark su-after-bg-sky-dark su-text-hocus-plum-dark su-after-bg-hocus-plum-dark': 'text-sky-dark after:bg-sky-dark hocus:text-plum-dark hocus:after:bg-plum-dark',
  'su-text-lagunita su-after-bg-lagunita su-text-hocus-plum-dark su-after-bg-hocus-plum-dark': 'text-lagunita after:bg-lagunita hocus:text-plum-dark hocus:after:bg-plum-dark',
};

export type CtaLinkColorsType = keyof typeof ctaLinkColors;

export const ctaSizes = {
  '': '',
  'ood-cta__button--medium': 'pt-11 px-30 pb-12 text-20 md:py-14 md:px-34 md:text-24',
  'ood-cta__button--large': 'py-16 px-30 text-22 md:py-20 md:px-36 md:text-28',
};

export type CtaSizesType = keyof typeof ctaSizes;

export const linkIcons = {
  'su-link--action': '',
  'su-link--jump': '',
  'su-link--external': '',
  'su-link--internal': '',
  'su-link--download': '',
  'su-link--video': '',
  'su-link--no-icon': '',
};

export type LinkIconsType = keyof typeof linkIcons;

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
  'su-mod-type-4': 'f4',
  'su-mod-type-6': 'f6',
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
