import { cnb } from 'cnbuilder';
import { cardBgColors, type CardBgColorType } from '@/utilities/datasource';

export const align = {
  left: 'start',
  center: 'center',
  right: 'end',
};
export type ContentAlignType = keyof typeof align;

// TODO DS-1433: Container query for smaller x padding when card is narrow
export const root = (backgroundColor: CardBgColorType) => cnb(
  'relative print:hidden break-words mx-auto w-full sm:w-3/4 lg:w-full rs-px-3 shadow-md focus-within:shadow-lg hover:shadow-lg transition-shadow',
  cardBgColors[backgroundColor || 'white'],
  backgroundColor === 'white' ? 'text-black' : 'text-white',
);

export const link = (backgroundColor: CardBgColorType) => cnb(
  'stretched-link *:hocus:underline outline-none focus-visible:after:outline focus-visible:after:outline-digital-blue',
  backgroundColor === 'white' ? '*:hocus:text-digital-red' : '*:hocus:text-white',
);

export const icon = (backgroundColor: CardBgColorType) => backgroundColor === 'white' ? 'text-digital-red' : 'text-white';
