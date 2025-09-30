import { cnb } from 'cnbuilder';

export const superhead = 'text-09em mb-16 md:max-lg:text-[.8em]';

export const link = 'group stretched-link font-semibold no-underline';

export const linkText = (hasDarkText: boolean) => cnb(
  'lg:leading-tight group-hocus:underline fluid-type-2 md:max-lg:text-25',
  hasDarkText ? 'group-hocus:text-digital-red' : 'group-hocus:text-white',
);

export const icon = (hasDarkText: boolean) => cnb(
  'ml-02em w-07em stroke-2 group-hocus:translate-x-01em group-hocus:-translate-y-01em',
  hasDarkText ? 'text-digital-red group-hover:text-digital-red' : 'text-white group-hover:text-white',
);

export const rootHasImage = 'ood-tile-card max-w-600 mx-auto !h-[calc(100%_-_8rem)] sm:w-3/4 md:w-full px-32 lg:px-36 2xl:px-38 md:max-lg:px-24';

export const contentHasImage = 'pt-24 pb-32 sm:pt-32 md:pt-24 md:pb-48 lg:py-36 2xl:pt-38 z-10 md:min-h-[24rem] lg:min-h-300 xl:min-h-[34rem]';

export const rootNoImage = 'ood-tile-card max-w-600 mx-auto sm:w-3/4 md:w-full md:min-h-[22rem] lg:min-h-300 xl:min-h-[34rem]';

export const contentNoImage = 'relative p-32 md:px-24 lg:px-32 xl:p-36 2xl:p-61 h-full z-10';
