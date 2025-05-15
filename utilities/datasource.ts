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
