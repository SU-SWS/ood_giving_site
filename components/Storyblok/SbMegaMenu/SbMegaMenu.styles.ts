import { cnb } from 'cnbuilder';
import { type DarkBgColorsType, darkBgColors } from '@/utilities/datasource';

/**
 * Mega menu section/panel
 */
export const section = cnb(
  'absolute transition-all',
  'md:aria-hidden:relative md:aria-hidden:opacity-0 md:aria-hidden:invisible md:aria-hidden:overflow-hidden md:aria-hidden:h-0 md:aria-hidden:scale-y-0 md:aria-hidden:origin-[center_top]',
  'md:flex md:h-auto md:opacity-1 md:visible md:scale-y-1',
  'w-full lg:bg-white lg:left-0 lg:w-full lg:aria-hidden:opacity-0 lg:aria-hidden:invisible lg:aria-hidden:scale-y-0 lg:aria-hidden:top-160 lg:z-[220] lg:aria-hidden:origin-[center-top] lg:aria-hidden:transition-all',
  'lg:absolute lg:flex lg:opacity-1 lg:visible lg:scale-y-1',
);

export const sectionContent = 'px-20 sm:px-30 md:px-50 lg:px-80 xl:px-100 2xl:pl-100 3xl:pl-[calc((100%-1500px)/2)] 3xl:pr-[calc((100%-1500px)/2)]';

//export const megaMenuSection = 'absolute w-full top-160 left-0 z-[220]';

export const MegaMenuNavItem = 'mb-20 last-of-type:mb-0';

export const MegaMenuNavLevel1Cta = 'relative text-20 lg:text-21 font-semibold leading-cozy no-underline hocus:no-underline text-black hocus:text-digital-red after:bg-digital-red';

export const MegaMenuNavLinkGroupHeading = 'mb-14 pt-10 md:pt-0 border-t border-black-40 first:border-t-0 md:border-t-0 text-17';

export const MegaMenuCardContent = ({ backgroundColor = 'digital-red' }: { backgroundColor?: DarkBgColorsType } = {}) => cnb(
  'ood-mega-nav__card-content rs-pt-2 rs-px-2 rs-pb-3 su-text-white',
  darkBgColors[backgroundColor],
);

export const MegaMenuCardCta = ({ external = false }: { external?: boolean } = {}) => cnb(
  'ood-mega-nav__card-cta after:bg-white after:hocus:bg-white mb-none',
  {
    'su-link--external': external,
    'su-link--action': !external,
  },
);
