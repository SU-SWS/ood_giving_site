import { cnb } from 'cnbuilder';

// Common styles and types
export type ContentALignmentType = 'start' | 'center' | 'end' | 'stretch';

export const root = (contentAlignment: ContentALignmentType) => contentAlignment === 'stretch' && '*:*:h-full';

/**
 * Row with 2 columns
 */
export type WidthRatioType = '1-to-1' | '1-to-2' | '2-to-1';

// TODO: Think about whether to finetune old flex width classes at the end
// https://stanford.atlassian.net/browse/DS-1433
export const rowWidths = {
  'full': 'w-full',
  'flex-xl-10-of-12': 'xl:w-10/12',
  'flex-lg-10-of-12 flex-xl-8-of-12': 'lg:w-10/12 xl:w-8/12',
};
export type RowWidthType = keyof typeof rowWidths;

export const rowAligns = {
  'su-mx-auto': 'mx-auto', // center
  'su-ml-none': '', // left
  'su-mr-none su-ml-auto': 'ml-auto', // right
};
export type RowAlignType = keyof typeof rowAligns;

export const colOne = (widthRatio: WidthRatioType, oneColumnMd: boolean) => cnb({
  'md:col-span-3': (widthRatio === '1-to-1' || !widthRatio) && !oneColumnMd,
  'lg:col-span-3': (widthRatio === '1-to-1' || !widthRatio) && oneColumnMd,
  'md:col-span-2': widthRatio === '1-to-2' && !oneColumnMd,
  'lg:col-span-2': widthRatio === '1-to-2' && oneColumnMd,
  'md:col-span-4': widthRatio === '2-to-1' && !oneColumnMd,
  'lg:col-span-4': widthRatio === '2-to-1' && oneColumnMd,
});

export const colTwo = (widthRatio: WidthRatioType, oneColumnMd: boolean) => cnb({
  'md:col-span-3': (widthRatio === '1-to-1' || !widthRatio) && !oneColumnMd,
  'lg:col-span-3': (widthRatio === '1-to-1' || !widthRatio) && oneColumnMd,
  'md:col-span-4': widthRatio === '1-to-2' && !oneColumnMd,
  'lg:col-span-4': widthRatio === '1-to-2' && oneColumnMd,
  'md:col-span-2': widthRatio === '2-to-1' && !oneColumnMd,
  'lg:col-span-2': widthRatio === '2-to-1' && oneColumnMd,
});
