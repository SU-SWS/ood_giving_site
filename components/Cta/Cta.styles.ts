import { type CtaIconLeftMarginType } from './Cta.types';

export const cta = 'group/cta transition-all print:hidden';
export const buttonBase = 'block cta-button font-normal w-fit no-underline hocus:underline leading-tight';
// hocus to plum dark gradient instead of solid plum dark to avoid a flash of white background on hocus
export const gradientButtonBase = 'bg-gradient-to-tr hocus:from-plum-dark hocus:to-plum-dark text-white hocus:text-white';
export const textLinkBase = 'block font-semibold w-fit no-underline text-18 md:text-20 leading-tight';
export const gradientTextLinkBase = 'bg-clip-text bg-gradient-to-tr text-transparent hocus:text-transparent';

// Maps to linkButtonStyle props in SbCtaLink. Only used for the Button style.
export const ctaButtonStyles = {
  // Primary
  'ood-cta__button--primary su-after-bg-white': 'bg-bay-dark text-white hocus:bg-palo-alto hocus:text-white',
  // Secondary
  'ood-cta__button--secondary su-after-bg-bay-dark su-after-bg-hocus-white': 'bg-white text-bay-dark shadow-bay-dark shadow-[inset_0_0_0_1px] after:text-bay-dark after:bg-bay-dark hocus:bg-bay-dark hocus:text-white hocus:after:text-white ',
  // Give Now Button
  'su-bg-digital-red su-bg-hocus-plum-dark su-text-white su-text-hocus-white su-after-bg-white su-after-bg-hocus-white': 'bg-digital-red hocus:bg-plum-dark text-white hocus:text-white',
  // Secondary Give Now Button
  'su-bg-white su-bg-hocus-plum-dark su-text-digital-red su-text-hocus-white su-after-bg-digital-red su-after-bg-hocus-white': 'bg-white hocus:bg-plum-dark text-digital-red hocus:text-white after:bg-digital-red ',
  // Ghost Button
  'ood-cta__button--ghost su-after-bg-white': 'text-white bg-transparent shadow-white shadow-[inset_0_0_0_1px] transition-shadow hocus:text-white hocus:shadow-[inset_0_0_0_3px]',
  // Solid Campaign Plum Button
  'su-bg-plum su-bg-hocus-plum-dark su-text-white su-text-hocus-white su-after-bg-white su-after-bg-hocus-white': 'bg-plum hocus:bg-plum-dark text-white hocus:text-white',
  // Gradient Campaign Buttons
  'su-bg-cardinal-dark-to-spirited-dark su-bg-hocus-plum-dark su-text-white su-text-hocus-white su-after-bg-white su-after-bg-hocus-white su-transition-none': `${gradientButtonBase} from-cardinal-red-dark to-spirited-dark`,
  'su-bg-plum-to-digital-red su-bg-hocus-plum-dark su-text-white su-text-hocus-white su-after-bg-white su-after-bg-hocus-white su-transition-none': `${gradientButtonBase} from-plum to-digital-red`,
  'su-bg-plum-to-spirited-dark su-bg-hocus-plum-dark su-text-white su-text-hocus-white su-after-bg-white su-after-bg-hocus-white su-transition-none': `${gradientButtonBase} from-plum to-spirited-dark`,
  'su-bg-palo-alto-dark-to-palo-verde-dark su-bg-hocus-plum-dark su-text-white su-text-hocus-white su-after-bg-white su-after-bg-hocus-white su-transition-none': `${gradientButtonBase} from-palo-alto-dark to-palo-verde-dark`,
  'su-bg-sky-dark-to-olive-dark su-bg-hocus-plum-dark su-text-white su-text-hocus-white su-after-bg-white su-after-bg-hocus-white su-transition-none': `${gradientButtonBase} from-sky-dark to-olive-dark`,
  'su-bg-sky-dark-to-bay-dark su-bg-hocus-plum-dark su-text-white su-text-hocus-white su-after-bg-white su-after-bg-hocus-white su-transition-none': `${gradientButtonBase} from-sky-dark to-bay-dark`,
};

// Maps to linkTextColor prop in SbCtaLink. Only used for the text link style.
export const ctaTextColors = {
  // The hocus color for this is actually sky-dark, so ignore the mismatch in the key
  'su-text-digital-red su-after-bg-digital-red su-text-hocus-plum-dark su-after-bg-hocus-plum-dark': 'text-digital-red hocus:text-sky-dark hocus:underline',
  'su-text-white su-text-hocus-white su-hocus-underline su-after-bg-white su-after-bg-hocus-white': 'text-white hocus:text-white hocus:underline',
  // Gradient text links for Campaign pages
  'ood-cta__link-gradient su-bg-sky-dark-to-bay-dark su-after-bg-sky-dark-to-bay-dark': `${gradientTextLinkBase} from-sky-dark to-bay-dark *:[&_svg]:text-bay-dark *:[&_svg]:hocus:text-bay-dark`,
  'ood-cta__link-gradient su-bg-cardinal-dark-to-spirited-dark su-after-bg-cardinal-dark-to-spirited-dark': `${gradientTextLinkBase} from-cardinal-red-dark to-spirited-dark *:[&_svg]:text-spirited-dark *:[&_svg]:hocus:text-spirited-dark`,
  'ood-cta__link-gradient su-bg-plum-to-digital-red su-after-bg-plum-to-digital-red': `${gradientTextLinkBase} from-plum to-digital-red *:[&_svg]:text-digital-red *:[&_svg]:hocus:text-digital-red`,
  'ood-cta__link-gradient su-bg-plum-to-spirited-dark su-after-bg-plum-to-spirited-dark': `${gradientTextLinkBase} from-plum to-spirited-dark *:[&_svg]:text-spirited-dark *:[&_svg]:hocus:text-spirited-dark`,
  'ood-cta__link-gradient su-bg-palo-alto-dark-to-palo-verde-dark su-after-bg-palo-alto-dark-to-palo-verde-dark': `${gradientTextLinkBase} from-palo-alto-dark to-palo-verde-dark *:[&_svg]:text-palo-verde-dark *:[&_svg]:hocus:text-palo-verde-dark`,
  'ood-cta__link-gradient su-bg-sky-dark-to-olive-dark su-after-bg-sky-dark-to-olive-dark': `${gradientTextLinkBase} from-sky-dark to-olive-dark *:[&_svg]:text-olive-dark *:[&_svg]:hocus:text-olive-dark`,
  // Has an extra su-after-bg-sky-dark-to-bay-dark in SB, but it seems to work here without the dupe string
  'ood-cta__link-gradient su-bg-sky-dark-to-bay-dark': `${gradientTextLinkBase} from-sky-dark to-bay-dark *:[&_svg]:text-bay-dark *:[&_svg]:hocus:text-bay-dark`,
  /**
   * Campaign page only solid text colors - seems on live site the intent was to use plum-dark as the hocus color, but it was overridden by the base link hocus color
   * Here we honor the original intent by using plum-dark as the hocus color
   */
  'su-text-lagunita-dark su-after-bg-lagunita-dark su-text-hocus-plum-dark su-after-bg-hocus-plum-dark': 'text-lagunita-dark hocus:text-plum-dark hocus:underline',
  'su-text-palo-verde su-after-bg-palo-verde su-text-hocus-plum-dark su-after-bg-hocus-plum-dark': 'text-palo-verde hocus:text-plum-dark hocus:underline',
  'su-text-plum su-after-bg-plum su-text-hocus-plum-dark su-after-bg-hocus-plum-dark': 'text-plum hocus:text-plum-dark hocus:underline',
  'su-text-brick su-after-bg-brick su-text-hocus-plum-dark su-after-bg-hocus-plum-dark': 'text-brick hocus:text-plum-dark hocus:underline',
  'su-text-cardinal-red su-after-bg-cardinal-red su-text-hocus-plum-dark su-after-bg-hocus-plum-dark': 'text-cardinal-red hocus:text-plum-dark hocus:underline',
  'su-text-palo-alto su-after-bg-palo-alto su-text-hocus-plum-dark su-after-bg-hocus-plum-dark': 'text-palo-alto hocus:text-plum-dark hocus:underline',
  'su-text-bay-dark su-after-bg-bay-dark su-text-hocus-plum-dark su-after-bg-hocus-plum-dark': 'text-bay-dark hocus:text-plum-dark hocus:underline',
  'su-text-sky-dark su-after-bg-sky-dark su-text-hocus-plum-dark su-after-bg-hocus-plum-dark': 'text-sky-dark hocus:text-plum-dark hocus:underline',
  'su-text-lagunita su-after-bg-lagunita su-text-hocus-plum-dark su-after-bg-hocus-plum-dark': 'text-lagunita hocus:text-plum-dark hocus:underline',
};

// Additional CTA variants we use for this site, e.g., as subcomponents for other components. These include styles for sizes, colors, icon styles, and other properties.
export const ctaVariants = {
  'local-footer': 'text-digital-red hocus:text-black underline leading-snug font-normal text-16 md:text-18 *:[&_svg]:hocus:text-digital-red',
  // Text links in the sub menu
  'sub-menu': 'text-14 sm:text-16 py-6 md:py-10 text-white leading-[4rem] md:leading-cozy hocus:text-white md:text-cool-grey md:hocus:text-digital-red font-normal no-underline hocus:underline',
  // For top level mega menu links
  'mega-menu': 'relative flex w-full lg:w-fit text-20 lg:text-21 px-20 sm:px-30 md:px-50 py-16 lg:px-0 font-semibold leading-cozy no-underline hocus:underline lg:hocus:no-underline text-black hocus:text-digital-red before:absolute before:inline-block before:w-6 md:before:w-10 before:h-full before:left-0 before:bottom-0 before:hocus:bg-digital-red before:scale-y-0 before:transition-all hocus:before:scale-y-100 lg:before:h-10 lg:before:w-full before:left-0 before:bottom-0 lg:before:scale-y-100 lg:before:scale-x-0 lg:hocus:before:scale-x-100 outline-none aria-current-page:before:bg-black aria-current-page:before:hocus:bg-digital-red aria-current-page:lg:before:bg-black-40 aria-current-page:before:scale-y-100 aria-current-page:lg:before:scale-x-100',
  // For mega men links inside dropdown panels/sections
  'mega-menu-link-lvl2': 'text-black hocus:text-digital-red no-underline hocus:underline leading-display font-normal text-19 *:[&_svg]:text-digital-red',
  // Content menu links
  'content-menu': 'relative flex w-full leading-cozy text-20 px-24 py-8 lg:py-12 font-semibold no-underline hocus:underline text-digital-red hocus:text-black before:absolute before:inline-block before:w-6 before:h-full before:left-0 before:bottom-0 before:bg-black before:scale-y-0 before:transition-transform hocus:before:scale-y-100 outline-none aria-current-page:text-black aria-current-page:underline aria-current-page:before:scale-y-100 aria-current-page:hocus:before:translate-x-6',
};

// Maps to linkButtonSize prop in SbCtaLink. Only used for the button styles
export const ctaButtonSizes = {
  default: 'pt-11 pb-12 px-30 text-18 md:text-20',
  'ood-cta__button--medium': 'pt-11 pb-12 px-30 md:py-14 md:px-34 text-20 md:text-24',
  'ood-cta__button--large': 'py-16 px-30 md:py-20 md:px-36 text-22 md:text-28',
};

// Maps to linkIcon prop in SbCtaLink
export const ctaIcons = {
  'su-link--action': 'chevron-right',
  'su-link--jump': 'chevron-down',
  'su-link--external': 'external',
  'su-link--internal': 'lock',
  'su-link--download': 'download',
  'su-link--video': 'video',
  'su-link--no-icon': '',
};

// Common styles for CTA icons
export const icon = 'inline-block will-change-transform transition-transform stroke-2';

// Icons have left margins
// Only add to this map if left margin is different from default class ml-04em
export const iconLeftMarginDefault = 'ml-04em';
export const iconLeftMargin: CtaIconLeftMarginType = {
  'su-link--action': 'ml-03em',
  'su-link--external': 'ml-03em',
  'su-link--jump': 'ml-03em',
};

// Maps to linkIcon prop in SbCtaLink. Animation preselected based on the icon type
export const iconAnimations = {
  'su-link--action': 'group-hover/cta:translate-x-02em group-focus-visible/cta:translate-x-02em',
  'su-link--jump': 'group-hover/cta:translate-y-02em group-focus-visible/cta:translate-y-02em',
  'su-link--external': 'group-hover/cta:translate-x-01em group-focus-visible/cta:translate-x-01em group-hover/cta:-translate-y-01em group-focus-visible/cta:-translate-y-01em',
  'su-link--internal': 'group-hover/cta:fill-current',
  'su-link--download': 'group-hover/cta:translate-y-02em group-focus-visible/cta:translate-y-02em',
  'su-link--video': 'group-hover/cta:translate-x-02em group-focus-visible/cta:translate-x-02em',
  'su-link--no-icon': '',
};

export const ctaAligns = {
  left: 'su-text-left',
  center: 'su-text-center mx-auto',
  right: 'su-text-right ml-auto mr-0',
};

export const ctaGroup = 'list-unstyled gap-x-08em gap-y-1em [&_li]:mb-0 [&_.cta-button]:max-sm:text-09em [&_.cta-button]:max-sm:p-07em';
