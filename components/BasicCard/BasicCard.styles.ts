import { cnb } from 'cnbuilder';
export const content = (largeCardPadding: boolean) => cnb(
  '[&_p]:mb-1em [&_ul]:mb-1em [&_ol]:mb-1em max-w-[91rem] mx-auto',
  largeCardPadding ? 'rs-pt-5' : 'rs-pt-2',
);
