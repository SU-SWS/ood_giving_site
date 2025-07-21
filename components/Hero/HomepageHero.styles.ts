import { cnb } from 'cnbuilder';
import { type LightPageBgColorType, type AllCardBgColorType, allCardBgColors } from '@/utilities/datasource';

export const root = (sectionBgColor: LightPageBgColorType) => cnb(
  'relative w-full z-0 border-b-[10rem] lg:border-b-[8rem]',
  sectionBgColor === 'fog-light' ? 'border-fog-light' : 'border-white',
);

export const h1Wrapper = 'lg:self-center';

export const h1 = 'mb-[.12em] text-shadow-lg sm:max-lg:fluid-type-7';

export const tab = (tabColor: AllCardBgColorType) => cnb(
  'h-10 w-[12.8rem]',
  allCardBgColors[tabColor],
);

export const imageWrapper = 'bg-brick h-[36rem] md:h-400 lg:h-500 xl:h-600 bg-black';

export const heroContent = 'cc absolute inset-0 flex-col lg:flex-row lg:items-end lg:justify-beteween gap-default';

export const card = 'group relative max-lg:self-center -bottom-100 lg:-bottom-80 w-full md:w-10/12 xl:w-5/12';

export const cardContent = 'relative z-1 rs-p-3';

export const cardHeading = 'group-hocus-within:underline';

export const cta = 'rs-mt-1 stretched-link text-white hocus:text-white hocus:no-underline';
