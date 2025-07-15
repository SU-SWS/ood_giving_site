import { cnb } from 'cnbuilder';
import { type LightPageBgColorType } from '@/utilities/datasource';

export const quoteMarkColors = {
  bay: 'text-bay',
  'cardinal-red': 'text-cardinal-red',
  lagunita: 'text-lagunita',
  'palo-verde-light': 'text-palo-verde-light',
};
export type QuoteMarkColorType = keyof typeof quoteMarkColors;

export const root = (bgColor: LightPageBgColorType, hasImage: boolean) => cnb('@container relative w-full break-words lg:flex-row lg:items-center max-w-1200 border shadow-md', {
  'border-black-10': bgColor === 'white',
  'border-black-20': bgColor === 'fog-light',
  // The 112rem max-width is to offset the negative margin when there's an image overhang
  'mt-80 lg:mt-0 lg:-ml-80 lg:w-[calc(100%-80px)] max-w-[112rem] lg:min-h-[30rem] xl:min-h-[40rem]': hasImage,
});
export const blockquote = (hasImage: boolean) => cnb('rs-px-4', hasImage ? 'lg:mt-72 2xl:mt-78 rs-pb-5' : 'rs-py-5');
export const quoteMark = (quoteColor: QuoteMarkColorType) => cnb(
  'block mt-03em leading-[0.1] font-serif text-[5em] font-bold',
  quoteMarkColors[quoteColor],
);
export const quote = (isSmallText: boolean) => cnb('font-serif *:*:leading-cozy *:*:tracking-tight [&_p]:mb-06em',
  isSmallText ? 'type-1' : 'type-2');
export const source = 'text-pretty big-paragraph max-w-550 font-semibold *:*:leading-display rs-mt-2';
export const imageWrapper = 'shrink-0 aspect-square rounded-full overflow-hidden self-end lg:self-center -mt-80 mr-34 md:mr-58 lg:mt-0 lg:-mr-80';
export const image = 'size-130 md:size-200 lg:size-[30cqw] 2xl:size-300';
