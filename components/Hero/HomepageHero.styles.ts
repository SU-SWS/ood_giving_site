import { cnb } from 'cnbuilder';
import { type LightPageBgColorType } from '@/utilities/datasource';

export const root = (sectionBgColor: LightPageBgColorType) => cnb(
  'relative w-full z-0 border-b-[6rem] md:border-b-[8rem]',
  sectionBgColor === 'fog-light' ? 'border-fog-light' : 'border-white',
);

export const imageWrapper = 'h-[43rem] md:h-500 xl:h-[56rem] bg-black';

export const cardWrapper = 'cc absolute inset-0';

export const card = 'relative -bottom-60 md:-bottom-80 rs-px-4 rs-pt-4 rs-pb-5 w-full sm:w-9/12 md:w-8/12 lg:w-7/12 xl:w-1/2';

export const ctaWrapper = 'rs-mt-2';
