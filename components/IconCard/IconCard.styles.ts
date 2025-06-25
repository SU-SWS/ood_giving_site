import { cnb } from 'cnbuilder';
import { cardBgColors, type CardBgColorType } from '@/utilities/datasource';

export const align = {
  left: 'start',
  center: 'center',
  right: 'end',
};
export type ContentAlignType = keyof typeof align;

export const root = (backgroundColor: CardBgColorType) => cnb(
    'relative break-words mx-auto sm:w-3/4 rs-px-3 w-full shadow-md focus-within:shadow-lg hover:shadow-lg transition-shadow',
    cardBgColors[backgroundColor || 'white'],
    backgroundColor === 'white' ? 'text-black' : 'text-white',
);

export const icon = (backgroundColor: CardBgColorType) => cnb(
  'text-[2em]',
  backgroundColor === 'white' ? 'text-digital-red' : 'text-white',
);
