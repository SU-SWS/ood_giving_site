export const root = 'flex no-underline font-normal w-fit';
export const contentWrapper = 'flex-row items-center';
export const logo = 'text-[1.43em] leading-half mt-[0.27em]';
export const bar = 'block w-1 h-1em mx-03em md:mx-02em';
export const text = 'text-[1.05em] mt-03em -ml-01em ml-0';
export const textColors = {
  default: 'text-black',
  white: 'text-white',
};
export type LogoTextColorType = keyof typeof textColors;
export const barColors = {
  default: 'bg-black',
  white: 'bg-white',
};
