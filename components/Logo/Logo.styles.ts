import { cnb } from 'cnbuilder';

export type LogoVariantType = 'horizontal' | 'stacked';

export const logoColors = {
  black: 'fill-black',
  white: 'fill-white',
  current: 'fill-current',
};
export type LogoColorType = keyof typeof logoColors;

export const link = (color: LogoColorType) => cnb('group block no-underline focus-visible:ring-2', {
  'focus-visible:ring-black': color === 'black',
  'focus-visible:ring-white': color === 'white',
});

// Giving Stories Logo styles
export const root = 'no-underline inline-block font-normal';
export const contentWrapper = 'flex-col sm:flex-row items-start sm:items-center';
export const logo = 'text-19 sm:text-[1.43em] leading-half mt-[0.27em]';
export const bar = 'hidden sm:block w-1 h-1em mx-03em';
export const text = 'text-15 sm:text-[1.05em] mt-03em -ml-01em sm:ml-0';
export const textColor = {
  default: 'text-black',
  white: 'text-white',
};
export const barColor = {
  default: 'bg-black',
  white: 'bg-white',
};
