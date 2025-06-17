import { cnb } from 'cnbuilder';
import { type DarkBgColorsType, darkBgColors } from '@/utilities/datasource';

/**
 * Mega menu section/panel
 */
export const section = 'relative lg:absolute transition-all origin-top w-full bg-fog-light lg:bg-white lg:left-0 lg:w-full shadow-xl break-words';

export const sectionContent = 'px-20 sm:px-30 md:px-50 lg:px-80 xl:px-100 2xl:pl-100 3xl:pl-[calc((100%-1500px)/2)] 3xl:pr-[calc((100%-1500px)/2)]';

export const navItem = 'mb-0';

export const MegaMenuNavLevel1Cta = 'relative inline-block text-20 lg:text-21 lg:py-16 font-semibold leading-cozy no-underline hocus:no-underline text-black hocus:text-digital-red before:absolute before:inline-block before:h-10 before:w-full before:left-0 before:bottom-0 before:bg-digital-red before:scale-x-0 before:transition-transform hocus:before:scale-x-100 aria-expanded:before:scale-x-100';

/**
 * Mega menu link group
 */
export const linkGroup = 'mb-20 md:mb-0 empty:mb-0';
export const linkGroupHeading = 'mb-[1.4em] pt-10 md:pt-0 border-t border-black-40 first:border-t-0 md:border-t-0 text-17';
export const linkGroupList = 'list-unstyled';
export const linkGroupItem = 'mb-20 last:mb-0';

/**
 * Mega menu card
 */
export const cardRoot = (backgroundColor: DarkBgColorsType = 'digital-red') => cnb(
  'relative group',
  darkBgColors[backgroundColor],
);
export const cardContent = 'rs-px-2 rs-pt-2 rs-pb-3 group-hover:bg-black-true/40 group-focus-within:bg-black-true/40 transition-colors';
export const cardHeading = 'rs-mb-1';
export const headingLink = 'stretched-link no-underline text-white hocus:text-white hocus:underline';
export const cardCta = '';
