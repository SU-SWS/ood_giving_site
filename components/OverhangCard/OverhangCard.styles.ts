import { cnb } from 'cnbuilder';
import { type CardBgColorType, cardBgColors } from '@/utilities/datasource';

export const root = (
  isVertical: boolean,
  hasImage: boolean,
  largeCardPadding: boolean,
  bgColor: CardBgColorType,
) => cnb(
  'relative break-words shadow-md border border-black-10 px-32 pb-32',
  cardBgColors[bgColor], {
    'md:px-72 md:pb-72 2xl:px-78 2xl:pb-78': largeCardPadding,
    'md:px-36 md:pb-36 2xl:px-38 2xl:pb-38': !largeCardPadding,
    'md:mt-80': isVertical && hasImage,
  },
);

export const imageWrapper = (isVertical: boolean, hasImage: boolean) => cnb(
  hasImage && isVertical ? 'md:-mt-80' : '',
);
