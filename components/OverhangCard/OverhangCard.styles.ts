import { cnb } from 'cnbuilder';
import { type ImageAspectRatioType } from '@/components/Image';
import { type CardBgColorType, cardBgColors } from '@/utilities/datasource';

export type OverhangCardOrientationType = 'vertical' | 'horizontal';
export type OverhangCardVariantType = 'basic' | 'tile' | 'quote' | 'story';

export const root = (
  isVertical: boolean,
  largeCardPadding: boolean,
  bgColor: CardBgColorType,
) => cnb(
  'relative break-words shadow-md border border-black-10',
  cardBgColors[bgColor], {
    'md:mt-80 px-32 pb-32': isVertical,
    'md:ml-80 pr-32 py-32': !isVertical,
    'md:px-72 md:pb-72 2xl:px-78 2xl:pb-78': largeCardPadding && isVertical,
    'md:px-36 md:pb-36 2xl:px-38 2xl:pb-38': !largeCardPadding && isVertical,
    'md:pr-72 md:py-72 2xl:pr-78 2xl:py-78': largeCardPadding && !isVertical,
    'md:pr-36 md:py-36 2xl:pr-38 2xl:py-38': !largeCardPadding && !isVertical,
  },
);

export const imageWrapper = (
  isVertical: boolean,
  variant: OverhangCardVariantType,
  aspectRatio: ImageAspectRatioType,
) => cnb(
  'hidden md:block shrink-0 grow-0',
  isVertical ? 'md:-mt-80' : 'md:-ml-80', // This sets the image overhang amount
  {
    'w-200': variant === 'basic' && !isVertical && aspectRatio === '1x1',
    'w-260 xl:w-[32rem] 2xl:w-[38rem]': variant === 'basic' && !isVertical && aspectRatio === '3x2',
  },
);
