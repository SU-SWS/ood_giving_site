import { cnb } from 'cnbuilder';
import { cardBgColors, type CardBgColorType } from '@/utilities/datasource';

export const align = {
  left: 'start',
  center: 'center',
  right: 'end',
};
export type ContentAlignType = keyof typeof align;

export const root = (backgroundColor: CardBgColorType) => cnb(
    'relative rs-px-3 w-full shadow-md',
    cardBgColors[backgroundColor || 'white'],
    backgroundColor === 'white' ? 'text-black' : 'text-white',
);

export const icon = (backgroundColor: CardBgColorType) => cnb(
  'text-[2em]',
  backgroundColor === 'white' ? 'text-digital-red' : 'text-white',
);
