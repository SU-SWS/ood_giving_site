import { cnb } from 'cnbuilder';

export const rootNoImage = (isFeatured: boolean) => cnb(
  'relative px-32 md:px-36 rs-pb-4 mx-auto',
  isFeatured ? 'w-full lg:px-45 2xl:px-48' : 'w-4/5 sm:w-3/4 md:w-full 2xl:px-38',
);

export const rootHasImage = (isFeatured: boolean) => !isFeatured && 'w-4/5 sm:w-3/4 md:w-full mx-auto';

export const imageWrapper = (isVertical: boolean) => !isVertical && 'w-[40vw] max-w-600 lg:-mr-[20vw] 2xl:-mr-300 lg:ml-38 rs-mt-3';

export const link = 'group stretched-link font-semibold';

export const linkText = 'before:block before:content-[""] before:h-10 before:w-80 before:bg-cardinal-red before:rs-mb-2 lg:leading-tight group-hocus:text-digital-red group-hocus:underline';

export const icon = 'ml-02em w-07em stroke-2 text-digital-red group-hover:text-digital-red group-hocus:translate-x-01em group-hocus:-translate-y-01em';

