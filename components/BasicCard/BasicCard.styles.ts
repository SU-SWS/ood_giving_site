import { cnb } from 'cnbuilder';

export const rootNoImage = (largeCardPadding: boolean) => cnb(
  'relative p-32',
  largeCardPadding ? 'md:p-72 2xl:p-78' : 'md:p-36 2xl:p-38',
);
export const content = (largeCardPadding: boolean) => cnb(
  '[&_p]:mb-1em [&_ul]:mb-1em [&_ol]:mb-1em max-w-[91rem] mx-auto',
  largeCardPadding ? 'pt-32 md:pt-50' : 'rs-pt-2',
);

export const heading = (largeHeading: boolean) => cnb(
  '-mt-02em text-pretty',
  largeHeading ? 'md:type-4' : 'lg:type-2',
);
