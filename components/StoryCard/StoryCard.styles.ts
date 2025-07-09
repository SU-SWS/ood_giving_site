import { cnb } from 'cnbuilder';

export const heading = 'before:block before:content-[""] before:h-10 before:w-80 before:bg-cardinal-red before:rs-mb-2';

export const rootNoImage = (isVertical: boolean) => cnb(
  'relative px-32 rs-pb-4',
  isVertical ? 'md:px-36 2xl:px-38' : 'md:px-45 2xl:px-48',
);

export const link = 'stretched-link font-semibold hocus:underline text-black hocus:text-digital-red';
