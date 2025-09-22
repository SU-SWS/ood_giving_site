import { cnb } from 'cnbuilder';

// Simple Card
export const rootNoImage = (isFeatured: boolean) => cnb(
  'relative px-32 md:px-36 rs-pb-4 mx-auto',
  isFeatured ? 'w-full lg:px-45 2xl:px-48' : 'w-4/5 sm:w-3/4 md:w-full 2xl:px-38',
);

// Overhang Card
export const rootHasImage = (isFeatured: boolean) => cnb(
  'px-32 pb-32 md:px-36 md:pb-45',
  !isFeatured && 'mx-auto !h-[calc(100%_-_8rem)] w-4/5 sm:w-3/4 md:w-full 2xl:px-38 2xl:pb-48',
  isFeatured && 'max-lg:w-full max-lg:!h-[calc(100%_-_8rem)] lg:flex-row-reverse lg:mt-0 lg:justify-between lg:mr-[18vw] xl:mr-[20vw] 2xl:mr-300 lg:pl-48 lg:pr-0 lg:rs-pb-3',
);

export const imageWrapper = (isFeatured: boolean) => isFeatured && 'lg:w-[36vw] xl:w-[40vw] lg:max-w-600 lg:-mr-[18vw] xl:-mr-[20vw] 2xl:-mr-300 lg:ml-38 lg:rs-mt-3';

export const link = 'group stretched-link font-semibold';

export const linkText = 'before:block before:content-[""] before:h-10 before:w-80 before:bg-cardinal-red before:rs-mb-2 lg:leading-tight group-hocus:text-digital-red group-hocus:underline';

export const icon = 'ml-02em w-07em stroke-2 text-digital-red group-hover:text-digital-red group-hocus:translate-x-01em group-hocus:-translate-y-01em';

