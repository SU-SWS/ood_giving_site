import { cnb } from 'cnbuilder';
import { type DarkBgColorType, darkBgColors } from '@/utilities/datasource';

export const innerShadow = 'absolute top-0 w-full h-15 bg-gradient-to-b from-black/10';

/**
 * Desktop mega menu
 */
export const root = 'hidden lg:block grow';
export const wrapper = 'list-unstyled gap-30 xl:gap-38';

/**
 * Mobile mega menu
 */
export const mobileRoot = 'lg:hidden flex z-[200] lg:items-center';
export const mobileButton = 'relative w-40 flex flex-col items-center pb-15 md:pb-25 font-semibold leading-[.7] md:leading-none text-digital-red hocus:text-black outline-none before:absolute before:h-6 md:before:h-10 before:w-full before:hocus:bg-digital-red before:left-0 before:bottom-0 before:scale-x-0 hocus:before:scale-x-100 before:transition-transform aria-expanded:before:scale-x-100 aria-expanded:before:hocus:bg-black';
export const mobileButtonIcon = 'w-24 stroke-[2.4] mb-3';
export const mobileTopMenu = 'absolute left-0 top-[10.8rem] md:top-[14.1rem] pt-12 pb-40 list-unstyled origin-top w-full bg-white shadow-xl [&_>li]:border-b [&_>li]:border-black-20';

/**
 * Mega menu nav item
 */
export const navItem = 'mb-0';
export const navItemChevron = 'lg:hidden text-digital-red';

/**
 * Mega menu section/panel
 */
const hocusBarMobile = 'before:absolute before:inline-block before:w-6 md:before:w-10 before:h-full before:left-0 before:bottom-0 before:bg-digital-red before:scale-y-0 before:transition-all hocus:before:scale-y-100 aria-expanded:before:scale-y-100';

const hocusBar = 'lg:before:h-10 lg:before:w-full lg:before:scale-y-100 lg:before:scale-x-0 lg:hocus:before:scale-x-100 lg:aria-expanded:before:scale-x-100';

export const panelButton = cnb('relative group flex items-center justify-between w-full text-left text-20 lg:text-21 px-20 sm:px-30 md:px-50 py-14 lg:px-0 lg:py-16 font-semibold leading-cozy no-underline hocus:underline lg:hocus:no-underline text-black hocus:text-digital-red outline-none', hocusBarMobile, hocusBar);

export const panelButtonIcon = 'size-33 lg:size-18 bg-digital-red group-hocus:bg-black lg:bg-transparent lg:group-hocus:bg-transparent rounded-full lg:-mt-01em inline-block p-6 lg:p-0 lg:ml-2 transition-all group-aria-expanded:rotate-180 text-white group-hocus-visible:text-white lg:text-black lg:group-hocus-visible:text-black';

export const sectionRoot = 'mb-0';
export const section = 'relative lg:absolute transition-all origin-top w-full bg-fog-light lg:bg-white lg:left-0 lg:w-full lg:shadow-xl break-words';
export const sectionContent = 'px-20 sm:px-30 md:px-50 lg:px-80 xl:px-100 2xl:pl-100 3xl:pl-[calc((100%-1500px)/2)] 3xl:pr-[calc((100%-1500px)/2)]';
export const sectionLinksWrapper = 'lg:col-span-2';
export const sectionLinkGroupGrid = 'gap-y-40 lg:gap-y-0';
export const sectionCtaWrapper = 'rs-mt-4 empty:mt-0';
export const sectionCardWrapper = 'mt-20 lg:mt-0';

/**
 * Mega menu link group
 */
export const linkGroup = 'empty:hidden border-t border-black-40 first:border-t-0 md:border-t-0 [&_h2]:first:pt-0';
export const linkGroupHeading = 'mb-[1.4em] pt-1em md:pt-0 text-17';
export const linkGroupList = 'list-unstyled';
export const linkGroupItem = 'mb-20 last:mb-0';

/**
 * Mega menu card
 */
export const cardRoot = (backgroundColor: DarkBgColorType = 'digital-red') => cnb(
  'relative group',
  darkBgColors[backgroundColor],
);
export const cardImageWrapper = 'hidden lg:block overflow-hidden';
export const cardImage = 'group-hocus-within:scale-105 transition-transform';
export const cardContent = 'rs-px-2 rs-pt-2 rs-pb-3 group-hover:bg-black-true/40 group-focus-within:bg-black-true/40 transition-colors';
export const cardHeading = 'rs-mb-1 type-3 lg:type-2';
export const headingLink = 'stretched-link no-underline text-white hocus:text-white hocus:underline';
export const cardCtaTextIcon = 'group-hocus-within:translate-x-02em';
