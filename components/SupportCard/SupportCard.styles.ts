import { cnb } from 'cnbuilder';
import { type AllCardBgColorType } from '@/utilities/datasource';

export const root = 'group/root print:hidden';

export const wrapper = 'relative h-full min-h-200 sm:min-h-230 xl:min-h-300 2xl:min-h-400 p-32 xl:p-48 2xl:p-61 z-10';

export const link = (bgColor: AllCardBgColorType) => cnb(
  'stretched-link group grow block *:hocus:underline outline-none focus-visible:after:outline focus-visible:after:outline-digital-blue',
  bgColor === 'white' ? '*:hocus:text-digital-red' : '*:hocus:text-white',
);

export const linkIcon = 'ml-02em w-07em stroke-2 group-hocus:translate-x-01em group-hocus:-translate-y-01em';

export const icon = (isDarkCardBg: boolean) => cnb(
  'self-end rs-mt-1 group-hover/root:scale-110 group-focus-within/root:scale-110 transition-transform',
  isDarkCardBg ? 'text-white' : 'text-black',
);
