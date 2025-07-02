import { cnb } from 'cnbuilder';
import { type CardBgColorType, cardBgColors } from '@/utilities/datasource';

export const root = (isVertical: boolean, hasImage: boolean, bgColor: CardBgColorType) => cnb(
  'relative shadow-md border',
  isVertical && hasImage ? 'md:mt-80' : '',
  isVertical && 'rs-px-2 rs-pb-2',
  cardBgColors[bgColor],
  bgColor === 'white' ? 'border-black-10' : '',
);

export const imageWrapper = (isVertical: boolean, hasImage: boolean) => cnb(
  hasImage && isVertical ? 'md:-mt-80' : '',
);
