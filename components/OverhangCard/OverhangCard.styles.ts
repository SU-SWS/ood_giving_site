import { cnb } from 'cnbuilder';
import { type CardBgColorType, cardBgColors } from '@/utilities/datasource';

export const root = (
  isVertical: boolean,
  hasImage: boolean,
  largeCardPadding: boolean,
  bgColor: CardBgColorType,
) => cnb(
  'relative break-words shadow-md border',
  cardBgColors[bgColor], {
    'rs-px-5 rs-pb-5': largeCardPadding,
    'rs-px-2 rs-pb-2': !largeCardPadding,
    'md:mt-80': isVertical && hasImage,
    'border-black-10': bgColor === 'white',
  },
);

export const imageWrapper = (isVertical: boolean, hasImage: boolean) => cnb(
  hasImage && isVertical ? 'md:-mt-80' : '',
);
