import { cnb } from 'cnbuilder';
import { type TextAlignType } from '@/components/Typography';
import {
  borderColors, type BorderColorType, type LightPageBgColorType, type AllCardBgColorType,
} from '@/utilities/datasource';

export const imageShapes = {
  square: '',
  round: 'rounded-full',
};
export type ImageShapeType = keyof typeof imageShapes;

export const quoteMarkColors = {
  bay: 'text-bay',
  'cardinal-red': 'text-cardinal-red',
  lagunita: 'text-lagunita',
  'palo-verde-light': 'text-palo-verde-light',
};
export type QuoteMarkColorType = keyof typeof quoteMarkColors;

export const root = (bgColor: LightPageBgColorType, hasImage: boolean) => cnb('@container relative w-full break-words lg:flex-row lg:items-center border shadow-md', {
  'border-black-10': bgColor === 'white',
  'border-black-20': bgColor === 'fog-light',
  // The 112rem max-width is to offset the negative margin when there's an image overhang
  'mt-80 lg:mt-0 lg:-ml-80 lg:w-[calc(100%-80px)] lg:min-h-[30rem] xl:min-h-[40rem]': hasImage,
});


/**
 * No image - rendered as Simple Card
 */
export const rootNoImage = (borderColor: BorderColorType) => cnb(
  borderColor && 'border-[.5rem]',
  borderColors[borderColor],
);

export const contentNoImage = (bgColor: AllCardBgColorType) => cnb(
  'rs-pt-4 rs-pb-4 px-32 md:px-58 lg:px-72 2xl:px-76',
);

/**
 * Has image - rendered as Overhang Card
 */
export const rootHasImage = (borderColor: BorderColorType) => cnb(
  borderColor && 'border-[.5rem]',
  borderColors[borderColor],
  '@container mt-80 lg:mt-0 lg:w-[calc(100%-80px)] lg:min-h-[30rem] xl:min-h-[40rem]',
);

export const contentHasImage = (bgColor: AllCardBgColorType) => cnb(
  'flex flex-col lg:flex-row lg:items-center w-full',
);

/**
 * Quote content
 */
export const blockquote = (hasImage: boolean) => cnb('rs-px-4', hasImage ? 'lg:mt-72 2xl:mt-78 rs-pb-5' : 'rs-py-5');

export const content = (textAlign: TextAlignType) => cnb(
  'w-full',
  textAlign === 'right' && 'items-end',
  textAlign === 'center' && 'items-center',
);

export const quoteMark = (quoteColor: QuoteMarkColorType, isSmallText: boolean) => cnb(
  'block mt-03em leading-[0.1] font-serif font-bold -ml-[.03em] text-[10rem] md:text-[11.3rem]',
  isSmallText ? '2xl:text-[11.9rem]' : 'lg:text-[14rem] 2xl:text-[14.8rem]',
  quoteMarkColors[quoteColor],
);

export const quote = (isSmallText: boolean) => cnb(
  'mt-03em *:*:leading-cozy [&_p]:mb-06em text-20 md:text-23',
  !isSmallText ? 'lg:text-28 2xl:text-30' : '2xl:text-24',
);

export const source = 'text-pretty max-w-550 *:*:leading-display rs-mt-2';

export const imageWrapper = (imageShape: ImageShapeType, isVertical: boolean) => cnb(
  'self-end lg:self-center size-130 md:size-200 lg:size-[30cqw] 2xl:size-300',
  isVertical ? '' : '-mr-80',
  imageShapes[imageShape],
);

export const image = 'size-130 md:size-200 lg:size-[30cqw] 2xl:size-300';
