import { cnb } from 'cnbuilder';
import { type ImageAspectRatioType } from '@/components/Image';
import { allCardBgColors, type AllCardBgColorType } from '@/utilities/datasource';

export type OverhangCardVariantType = 'basic' | 'tile' | 'quote' | 'story';

export const root = (
  variant: OverhangCardVariantType,
  isVertical: boolean,
  hasLink: boolean,
  largeCardPadding: boolean,
  bgColor: AllCardBgColorType,
) => cnb(
  'relative break-words shadow-md border border-black-10',
  hasLink && 'focus-within:shadow-lg hover:shadow-lg transition-shadow',
  allCardBgColors[bgColor],
  {
    'flex-row': !isVertical && variant === 'basic',
    'flex-row-reverse': !isVertical && variant !== 'basic',
    'flex-col md:mt-80 px-32 pb-32 md:h-[calc(100%_-_8rem)]': isVertical,
    'md:ml-80 pr-32 py-32': !isVertical && variant === 'basic',
    'lg:mr-[20vw] 2xl:mr-300': !isVertical && variant === 'story',
    'md:px-72 md:pb-72 2xl:px-78 2xl:pb-78': largeCardPadding && isVertical,
    'md:px-36 md:pb-36 2xl:px-38 2xl:pb-38': !largeCardPadding && isVertical,
    'md:pr-72 md:py-72 2xl:pr-78 2xl:py-78': largeCardPadding && !isVertical && variant !== 'story',
    'md:pr-36 md:py-36 2xl:pr-38 2xl:py-38': !largeCardPadding && !isVertical && variant !== 'story',
    'lg:pl-48 rs-pb-3': !isVertical && variant === 'story',
  },
);

export const imageWrapper = (
  isVertical: boolean,
  variant: OverhangCardVariantType,
  aspectRatio: ImageAspectRatioType,
) => cnb(
  'shrink-0 grow-0',
  isVertical && 'md:-mt-80', // Sets the image overhang amount for vertical cards
  {
    'hidden md:block': variant === 'basic' || variant === 'tile',
    // Basic card
    'md:-ml-80': variant === 'basic' && !isVertical,
    'w-200': variant === 'basic' && !isVertical && aspectRatio === '1x1',
    'w-260 xl:w-[32rem] 2xl:w-[38rem]': variant === 'basic' && !isVertical && aspectRatio === '3x2',
    // Story card
    'hidden: sm:block': variant === 'story',
    'w-[40vw] max-w-600 lg:-mr-[20vw] 2xl:-mr-300 lg:ml-38 rs-mt-3': variant === 'story' && !isVertical,
  },
);
