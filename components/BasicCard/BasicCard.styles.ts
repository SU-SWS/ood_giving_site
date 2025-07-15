import { cnb } from 'cnbuilder';
import { type ImageAspectRatioType } from '@/components/Image';

/**
 * Common styles
 */
export const heading = (largeHeading: boolean) => cnb(
  '-mt-02em text-pretty whitespace-pre-line',
  largeHeading ? 'md:fluid-type-3' : 'lg:type-2',
);

export const superhead = 'text-09em mb-16';

export const content = 'max-w-[91rem] [&_p]:mb-1em [&_ul]:mb-1em [&_ol]:mb-1em';

export const ctaWrapper = 'rs-mt-1 mb-6';

/**
 * No image - rendered as Simple Card
 */
export const rootNoImage = (largeCardPadding: boolean) => cnb(
  'relative p-32 w-full',
  largeCardPadding ? 'md:p-72 2xl:p-76' : 'md:p-36 2xl:p-38',
);

export const contentNoImage = cnb(content, 'mx-auto');

/**
 * Has image - rendered as Overhang Card
 */
export const roothasImage = (isVertical: boolean) => isVertical && 'pb-32 max-md:mt-0 md:mt-80';


export const contentHasImage = (isVertical: boolean, largeCardPadding: boolean) => cnb(
  content, {
    'rs-pt-2': isVertical && !largeCardPadding,
    'pt-32 md:pt-50': isVertical && largeCardPadding,
    'rs-pl-2': !isVertical,
  },
);

export const superheadHasImage = cnb(superhead, '-mt-4');

export const imageWrapper = (isVertical: boolean, aspectRatio: ImageAspectRatioType) => cnb(
  'hidden md:block', {
    '-ml-80': !isVertical,
    'w-200': !isVertical && aspectRatio === '1x1',
    'w-260 xl:w-[32rem] 2xl:w-[38rem]': !isVertical && aspectRatio === '3x2',
  },
);
