import { cnb } from 'cnbuilder';

export type RowWidthType = 'full' | 'flex-xl-10-of-12' | 'flex-lg-10-of-12 flex-xl-8-of-12';
export type WidthRatioType = '1-to-1' | '1-to-2' | '2-to-1';
export type ContentALignmentType = 'start' | 'center' | 'end' | 'stretch';

/**
 * Row with 2 columns
 */
export const rowTwoColumns = (contentAlignment: ContentALignmentType) => contentAlignment === 'stretch' && '*:*:h-full';

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
