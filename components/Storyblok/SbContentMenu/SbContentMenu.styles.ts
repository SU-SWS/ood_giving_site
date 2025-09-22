import { cnb } from 'cnbuilder';

export const root = 'hidden lg:block';

/**
 * Mobile content menu
 */
export const mobileRoot = 'lg:hidden group relative max-w-400 mx-auto';
export const mobileButton = 'relative w-full flex items-center justify-between max-w-400 mx-auto py-10 px-24 text-15 md:text-16 text-white uppercase tracking-widest leading-none font-semibold bg-transparent shadow-white shadow-[inset_0_0_0_1px] hocus:shadow-[inset_0_0_0_3px] transition-all hocus:text-white aria-expanded:shadow-white aria-expanded:hocus:shadow-white aria-expanded:bg-black-10 aria-expanded:text-black aria-expanded:hocus:text-cardinal-red outline-none';
export const mobileButtonIcon = 'w-22 stroke-2';

/**
 * Menu group
 */
export const linkGroup = 'rs-mb-1';
export const menuTitle = 'rs-pt-0 max-lg:mx-24 rs-mb-1 text-16 border-t border-black-40';
export const menu = 'list-unstyled';
export const mobilePanel = 'absolute z-[200] flex w-[--button-width] flex-col list-unstyled bg-white shadow-xl py-30 origin-top';

/**
 * Parent item
 */
export const parentItem = 'mb-0';

/**
 * Nav item
 */
export const navItem = 'mb-0';

/**
 * Nested menu
 */
export type MenuLevelType = 'lv2' | 'lv3';
export const nestedMenu = (menuLevel: MenuLevelType) => cnb(
  'list-unstyled mb-04em *:pl-20 *:*:py-8 *:*:lg:py-12',
  menuLevel === 'lv3' ? '*:*:text-16' : '*:*:text-18',
);
