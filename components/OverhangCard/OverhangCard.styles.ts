import { cnb } from 'cnbuilder';
import { allCardBgColors, type AllCardBgColorType } from '@/utilities/datasource';

export const root = (
  hasLink: boolean,
  bgColor: AllCardBgColorType,
  isDarkBg: boolean,
) => cnb(
  'group relative flex-col mt-80 break-words shadow-md',
  allCardBgColors[bgColor],
  {
    'focus-within:shadow-lg hover:shadow-lg transition-shadow': hasLink,
    'border border-black/10': !isDarkBg,
    'before:absolute before:z-0 before:inset-0 hover:before:bg-black-true/40 focus-within:before:bg-black-true/40': hasLink && isDarkBg,
  },
);

export const imageWrapper = 'shrink-0 grow-0 overflow-hidden -mt-80';

export const image = (hasLink: boolean) => hasLink && 'group-hocus-within:scale-105 will-change transition-transform *:w-full';
