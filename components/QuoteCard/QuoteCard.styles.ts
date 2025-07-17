import { cnb } from 'cnbuilder';
import { type TextAlignType } from '@/components/Typography';
import { borderColors, type BorderColorType } from '@/utilities/datasource';

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

/**
 * No image - rendered as Simple Card
 */
export const rootNoImage = (borderColor: BorderColorType) => cnb(
  borderColor && 'border-[.5rem]',
  borderColors[borderColor],
);

export const contentNoImage = 'rs-pt-5 rs-pb-4 px-32 md:px-58 lg:px-72 2xl:px-76';

/**
 * Has image - rendered as Overhang Card
 */
export const rootHasImage = (borderColor: BorderColorType) => cnb(
  borderColor && 'border-[.5rem]',
  borderColors[borderColor],
  '@container lg:flex-row-reverse lg:justify-between px-32 md:px-58 mt-80 lg:mt-0 lg:w-[calc(100%-80px)] lg:min-h-[30rem] xl:min-h-[42rem] lg:mr-80 lg:pr-0 lg:pl-72 2xl:pl-78',
);

export const contentHasImage = 'flex flex-col lg:flex-row lg:items-center w-full pb-36 md:pb-58 lg:pt-58';

/**
 * Quote content
 */
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
  'mt-03em *:*:leading-cozy [&_p]:mb-06em [&_p]:text-20 md:[&_p]:text-23',
  !isSmallText ? 'lg:[&_p]:text-28 2xl:[&_p]:text-30' : '2xl:[&_p]:text-24',
);

export const source = 'text-20 md:text-23 2xl:text-24 text-pretty max-w-550 *:*:leading-display rs-mt-2';

export const imageWrapper = (imageShape: ImageShapeType) => cnb(
  'self-end lg:self-center size-130 md:size-200 lg:size-[30cqw] 2xl:size-300 lg:mt-0 lg:-mr-80 lg:ml-45',
  imageShapes[imageShape],
);

export const image = 'size-130 md:size-200 lg:size-[30cqw] 2xl:size-300';
