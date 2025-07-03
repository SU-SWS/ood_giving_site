import { cnb } from 'cnbuilder';

/**
 * Common styles
 */
export const heading = (largeHeading: boolean) => cnb(
  '-mt-02em text-pretty',
  largeHeading ? 'md:type-4' : 'lg:type-2',
);

/**
 * No image - rendered as Simple Card
 */
export const rootNoImage = (largeCardPadding: boolean) => cnb(
  'relative p-32',
  largeCardPadding ? 'md:p-72 2xl:p-78' : 'md:p-36 2xl:p-38',
);

export const contentNoImage = 'max-w-[91rem] lg:w-fit mx-auto';

/**
 * Has image - rendered as Overhang Card
 */
export const contentHasImage = (isVertical: boolean, largeCardPadding: boolean) => cnb(
  '[&_p]:mb-1em [&_ul]:mb-1em [&_ol]:mb-1em max-w-[91rem]', {
    'rs-pt-2': isVertical && !largeCardPadding,
    'pt-32 md:pt-50': isVertical && largeCardPadding,
    'rs-pl-2': !isVertical,
    // 'pl-32': !isVertical && largeCardPadding,
  },
);
