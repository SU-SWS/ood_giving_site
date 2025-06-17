import { cnb } from 'cnbuilder';
import { type DarkBgColorsType, darkBgColors } from '@/utilities/datasource';

/**
 * Mobile mega menu
 */
export const mobileButton = 'group/toggle w-40 flex flex-col items-center pb-15 md:pb-25 font-semibold leading-[.7] md:leading-none text-digital-red hocus:text-black outline-none';
export const mobileButtonIcon = 'w-24 stroke-[2.4] mb-3';
export const mobileTopMenu = 'absolute left-0 top-[10.8rem] md:top-[14.1rem] pt-12 pb-40 list-unstyled origin-top w-full bg-white shadow-xl *:border-b *:border-black-20';

/**
 * Mega menu section/panel
 */
const hocusBarMobile = 'before:absolute before:inline-block before:w-6 before:h-full before:left-0 before:bottom-0 before:bg-digital-red before:scale-y-0 before:transition-transform hocus:before:scale-y-100';

const hocusBar = 'lg:before:h-10 lg:before:w-full before:left-0 before:bottom-0 lg:before:scale-y-100 lg:before:scale-x-0 lg:hocus:before:scale-x-100';

export const panelButton = cnb('relative group flex items-center justify-between w-full text-left text-20 lg:text-21 px-20 sm:px-30 md:px-50 py-14 lg:px-0 lg:py-16 font-semibold leading-cozy no-underline hocus:underline lg:hocus:no-underline text-black hocus:text-digital-red outline-none', hocusBarMobile, hocusBar);

export const panelButtonIcon = 'size-33 lg:size-18 bg-digital-red group-hocus:bg-black lg:bg-transparent lg:group-hocus:bg-transparent rounded-full lg:-mt-01em inline-block p-6 lg:p-0 lg:ml-2 transition-transform group-aria-expanded:rotate-180 text-white group-hocus-visible:text-white lg:text-black lg:group-hocus-visible:text-black';

export const section = 'relative lg:absolute transition-all origin-top w-full bg-fog-light lg:bg-white lg:left-0 lg:w-full lg:shadow-xl break-words';
export const sectionContent = 'px-20 sm:px-30 md:px-50 lg:px-80 xl:px-100 2xl:pl-100 3xl:pl-[calc((100%-1500px)/2)] 3xl:pr-[calc((100%-1500px)/2)]';
export const navItem = 'mb-0';

/**
 * Mega menu link group
 */
export const linkGroup = 'empty:hidden';
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
