export const root = 'no-underline inline-block font-normal';
export const contentWrapper = 'flex-col sm:flex-row items-start sm:items-center';
export const logo = 'text-19 sm:text-[1.43em] leading-half mt-[0.27em]';
export const bar = 'hidden sm:block w-1 h-1em mx-03em';
export const text = 'text-15 sm:text-[1.05em] mt-03em -ml-01em sm:ml-0';
export const textColors = {
  default: 'text-black',
  white: 'text-white',
};
export type LogoTextColorType = keyof typeof textColors;
export const barColors = {
  default: 'bg-black',
  white: 'bg-white',
};
