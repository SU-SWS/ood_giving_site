import { cnb } from 'cnbuilder';

export const rootNoImage = 'relative p-32 md:px-24 lg:px-32 xl:p-36 2xl:p-61';

export const superhead = 'text-09em mb-16';

export const heading = 'fluid-type-2 md:max-lg:text-25';

export const link = 'group stretched-link font-semibold';

export const linkText = (hasDarkText: boolean) => cnb(
  'lg:leading-tight  group-hocus:underline',
  hasDarkText ? 'group-hocus:text-digital-red' : 'group-hocus:text-white',
);

export const icon = (hasDarkText: boolean) => cnb(
  'ml-02em w-07em stroke-2 group-hocus:translate-x-01em group-hocus:-translate-y-01em',
  hasDarkText ? 'text-digital-red group-hover:text-digital-red' : 'text-white group-hover:text-white',
);

export const contentHasImage = 'pt-32 md:pt-36 2xl:pt-38 z-10';
