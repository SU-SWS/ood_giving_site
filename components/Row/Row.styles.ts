import { cnb } from 'cnbuilder';

// Common styles and types
export type ContentALignmentType = 'start' | 'center' | 'end' | 'stretch';

export const root = (contentAlignment: ContentALignmentType) => contentAlignment === 'stretch' && '*:*:h-full';

export const rowAligns = {
  'su-mx-auto': 'mx-auto', // center
  'su-ml-none': '', // left
  'su-mr-none su-ml-auto': 'ml-auto', // right
};
export type RowAlignType = keyof typeof rowAligns;

// TODO: Think about whether to finetune old flex width classes at the end
// https://stanford.atlassian.net/browse/DS-1433

/**
 * Row with 1 column
 */
export const rowOneColumnWidths = {
  'flex-12-of-12': 'w-full', // 12 of 12 columns
  'flex-lg-10-of-12': 'lg:w-10/12', // 10 of 12 columns at LG
  'flex-lg-9-of-12': 'lg:w-9/12', // 9 of 12 columns at LG
  'flex-lg-10-of-12 flex-xl-8-of-12': 'lg:w-10/12 xl:w-8/12', // 8 of 12 columns at XL
  'flex-md-10-of-12 flex-lg-8-of-12 flex-xl-6-of-12': 'md:w-10/12 lg:w-8/12 xl:w-6/12', // 6 of 12 columns at XL
  'flex-md-8-of-12 flex-lg-6-of-12 flex-xl-4-of-12': 'md:w-8/12 lg:w-6/12 xl:w-4/12', // 4 of 12 columns at XL
};
export type RowOneColumnWidthType = keyof typeof rowOneColumnWidths;

/**
 * Row with 2 columns
 */
export type WidthRatioType = '1-to-1' | '1-to-2' | '2-to-1';

export const rowTwoColumnWidths = {
  'full': 'w-full',
  'flex-xl-10-of-12': 'xl:w-10/12',
  'flex-lg-10-of-12 flex-xl-8-of-12': 'lg:w-10/12 xl:w-8/12',
};
export type RowTwoColumnWidthType = keyof typeof rowTwoColumnWidths;

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
