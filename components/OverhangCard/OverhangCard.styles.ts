import { cnb } from 'cnbuilder';
import { allCardBgColors, type AllCardBgColorType } from '@/utilities/datasource';

export type OverhangCardVariantType = 'basic' | 'tile' | 'quote' | 'story';

export const root = (
  variant: OverhangCardVariantType,
  isVertical: boolean,
  hasLink: boolean,
  largeCardPadding: boolean,
  bgColor: AllCardBgColorType,
  isDarkBg: boolean,
) => cnb(
  'group relative break-words shadow-md border border-black-10',
  isVertical && 'flex-col mt-80',
  (isVertical && variant !== 'quote') && 'px-32 lg:px-36 2xl:px-38',
  allCardBgColors[bgColor],
  {
    'flex-row': !isVertical && variant === 'basic',
    'flex-row-reverse justify-between': !isVertical && variant !== 'basic',
    'md:h-[calc(100%_-_8rem)]': isVertical && variant === 'basic',
    'md:ml-80 pr-32 py-32': !isVertical && variant === 'basic',
    'pb-32 !h-[calc(100%_-_8rem)]': variant === 'story' && isVertical,
    'lg:mr-[20vw] 2xl:mr-300 lg:pl-48 rs-pb-3': variant === 'story' && !isVertical,
    'md:px-72 md:pb-72 2xl:px-78 2xl:pb-78': largeCardPadding && isVertical && variant === 'basic',
    'md:px-36 md:pb-36 2xl:px-38 2xl:pb-38': !largeCardPadding && isVertical && variant === 'basic',
    'md:pr-72 md:py-72 2xl:pr-78 2xl:py-78': largeCardPadding && !isVertical && variant === 'basic',
    'md:pr-36 md:py-36 2xl:pr-38 2xl:py-38': !largeCardPadding && !isVertical && variant === 'basic',
    'md:px-36 md:pb-45 2xl:px-38 2xl:pb-48': variant === 'story' && isVertical,
    'focus-within:shadow-lg hover:shadow-lg transition-shadow before:absolute before:z-0 before:inset-0 hover:before:bg-black-true/40 focus-within:before:bg-black-true/40': hasLink && isDarkBg,
  },
);

export const imageWrapper = (isVertical: boolean) => cnb(
  'shrink-0 grow-0 overflow-hidden',
  isVertical && '-mt-80',
);

export const image = (hasLink: boolean) => hasLink && 'group-hocus-within:scale-105 will-change transition-transform';
