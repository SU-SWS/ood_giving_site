import { cnb } from 'cnbuilder';
import { type LightPageBgColorType, type AllCardBgColorType, allCardBgColors } from '@/utilities/datasource';

export const root = (sectionBgColor: LightPageBgColorType) => cnb(
  'relative w-full z-0 border-b-[10rem] lg:border-b-[8rem]',
  sectionBgColor === 'fog-light' ? 'border-fog-light' : 'border-white',
);

export const imageWrapper = 'bg-brick h-[36rem] md:h-400 lg:h-500 xl:h-600 max-lg:after:absolute max-lg:after:inset-0 max-lg:after:bg-gradient-to-b max-lg:after:from-sky-dark/30 max-lg:after:to-sky-dark/10';

export const heroContent = 'cc absolute inset-0 max-lg:-bottom-100 flex-col justify-end md:items-center lg:flex-row lg:items-end lg:justify-beteween lg:gap-40';

export const h1Wrapper = 'lg:self-center rs-mb-2 lg:mb-0 md:w-10/12 lg:w-7/12';

export const h1 = 'mb-[.12em] text-shadow-lg sm:max-lg:fluid-type-7 lg:mt-50';

export const tab = (tabColor: AllCardBgColorType) => cnb(
  'h-10 w-[12.8rem]',
  allCardBgColors[tabColor],
);

export const card = 'group relative max-lg:self-center lg:-bottom-80 w-full md:w-10/12 lg:w-5/12';

export const cardContent = 'relative z-1 rs-p-3';

export const cardHeading = 'group-hocus-within:underline';

export const cta = 'rs-mt-1 stretched-link text-white hocus:text-white hocus:no-underline';
