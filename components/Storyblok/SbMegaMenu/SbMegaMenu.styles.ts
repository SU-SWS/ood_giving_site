import { cnb } from 'cnbuilder';
import { type DarkBgColorsType, darkBgColors } from '@/utilities/datasource';

// <div className=" aria-h" />

export const MegaMenuSection = cnb(
  'absolute transition-all',
  'md:aria-hidden:relative md:aria-hidden:opacity-0 md:aria-hidden:invisible md:aria-hidden:overflow-hidden md:aria-hidden:h-0 md:aria-hidden:scale-y-0 md:aria-hidden:origin-[center_top]',
  'md:flex md:h-auto md:opacity-1 md:visible md:scale-y-1',
  'lg:aria-hidden:bg-white lg:aria-hidden:left-0 lg:aria-hidden:w-full lg:aria-hidden:opacity-0 lg:aria-hidden:invisible lg:aria-hidden:scale-y-0 lg:aria-hidden:top-160 lg:aria-hidden:z-[220] lg:aria-hidden:origin-[center-top] lg:aria-hidden:transition-all',
  'lg:absolute lg:flex lg:opacity-1 lg:visible lg:scale-y-1',
);

export const MegaMenuNavItem = 'mb-20 last-of-type:mb-0';

export const MegaMenuNavLink = 'text-19 font-normal leading-display hocus:underline hocus:text-digital-red after:bg-digital-red';

export const MegaMenuNavLinkGroupHeading = 'mb-14 pt-10 md:pt-0 border-t border-black-40 md:border-t-0 text-17 tracking-widest uppercase';

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
