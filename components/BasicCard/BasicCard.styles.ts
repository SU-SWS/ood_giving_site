import { cnb } from 'cnbuilder';
import { type ImageAspectRatioType } from '@/components/Image';

/**
 * Card content styles
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
  // On mobile all cards have the same padding
  'relative p-32 w-full',
  largeCardPadding ? 'md:p-72 2xl:p-76' : 'md:p-36 2xl:p-38',
);

export const contentNoImage = cnb(content, 'mx-auto');

/**
 * Has image - rendered as Overhang Card
 */
export const roothasImage = (isVertical: boolean, largeCardPadding: boolean) => cnb(
  'px-32 pb-32',
  {
    // Vertical card
    '!h-[calc(100%_-_8rem)]': isVertical,
    'md:px-72 md:pb-72 2xl:px-78 2xl:pb-78': largeCardPadding && isVertical,
    'md:px-36 md:pb-36 2xl:px-38 2xl:pb-38': !largeCardPadding && isVertical,
    // Horizontal card
    'max-md:h-[calc(100%_-_8rem)] md:mt-0 md:pl-0 md:flex-row md:ml-80 pr-32': !isVertical,
    'md:pr-72 md:py-72 2xl:pr-78 2xl:py-78': largeCardPadding && !isVertical,
    'md:pr-36 md:py-36 2xl:pr-38 2xl:py-38': !largeCardPadding && !isVertical,
  },
);

export const contentHasImage = (isVertical: boolean, largeCardPadding: boolean) => cnb(content,
  'pt-32',
  {
    'md:pt-36 2xl:pt-38': isVertical && !largeCardPadding,
    'md:pt-50': isVertical && largeCardPadding,
    'md:pt-0 md:rs-pl-2': !isVertical,
  },
);

export const superheadHasImage = cnb(superhead, '-mt-4');

export const imageWrapper = (isVertical: boolean, aspectRatio: ImageAspectRatioType) => cnb(
  {
    '[&_img]:w-full': isVertical,
    'md:mt-0 md:-ml-80': !isVertical,
    'max-md:self-end w-130 md:w-200': !isVertical && aspectRatio === '1x1',
    'md:w-260 xl:w-[32rem] 2xl:w-[38rem]': !isVertical && aspectRatio === '3x2',
  },
);
