import { cnb } from 'cnbuilder';

export const footerColors = {
  'cardinal-red': 'bg-cardinal-red',
  black: 'bg-black',
};
export type FooterColorType = keyof typeof footerColors;

export const root = (color: FooterColorType) => cnb(
  'print:hidden w-full basefont-20 rs-py-1 text-white',
  footerColors[color || 'cardinal-red'],
);
export const outerWrapper = 'lg:flex-row';
export const logoWrapper = 'text-center mt-5 mb-9';
export const logo = 'type-3';
export const contentWrapper = 'lg:pl-45 xl:pl-50 text-left sm:text-center lg:text-left grow';
export const menusWrapper = 'sm:flex-col sm:items-center lg:items-start mb-10';
export const stanfordMenu = 'list-unstyled mb-10 sm:mb-4 mr-19 sm:mr-0 p-0 text-15 md:text-17 2xl:text-18 flex flex-col sm:flex-row';
export const legalMenu = 'list-unstyled mb-10 sm:mb-0 ml-19 sm:ml-0 p-0 text-15 sm:text-14 md:text-15 xl:text-16 flex flex-col sm:flex-row sm:link-regular';
export const listItem = 'sm:mr-10 md:mr-20 lg:mr-27';
export const link = 'text-white no-underline hocus:underline hocus:text-white';
export const copyright = 'text-13 sm:text-14 text-center lg:text-left';
export const copyrightText = 'whitespace-no-wrap';
