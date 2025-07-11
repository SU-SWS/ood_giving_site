import { cnb } from 'cnbuilder';

export const heading = 'before:block before:content-[""] before:h-10 before:w-80 before:bg-cardinal-red before:rs-mb-2';

export const rootNoImage = (isFeatured: boolean) => cnb(
  'relative px-32 md:px-36 rs-pb-4',
  isFeatured ? 'lg:px-45 2xl:px-48' : '2xl:px-38',
);

export const link = 'peer stretched-link font-semibold hocus:underline text-black hocus:text-digital-red';

export const icon = 'ml-02em w-07em stroke-2 text-digital-red peer-hover:text-digital-red peer-focus:text-digital-red peer-hover:translate-x-01em peer-focus:translate-x-01em peer-hover:-translate-y-01em peer-focus:-translate-y-01em';
