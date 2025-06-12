import { type CtaIconLeftMarginType } from './Cta.types';

export const cta = 'group/cta hocus-visible:underline transition-all';
export const ctaButtonBase = 'inline-block font-normal w-fit';

// Only used for the Button style
export const ctaButtonStyles = {
  'ood-cta__button--primary su-after-bg-white': 'bg-bay-dark text-white hocus:bg-palo-alto hocus:text-white', // Default
  'ood-cta__button--secondary su-after-bg-bay-dark su-after-bg-hocus-white': 'bg-white text-bay-dark shadow-bay-dark shadow-[inset_0_0_0_1px] after:text-bay-dark after:bg-bay-dark hocus:bg-bay-dark hocus:text-white hocus:after:text-white ',
  'su-bg-digital-red su-bg-hocus-plum-dark su-text-white su-text-hocus-white su-after-bg-white su-after-bg-hocus-white': 'bg-digital-red hocus:bg-plum-dark text-white hocus:text-white  ',
  'su-bg-white su-bg-hocus-plum-dark su-text-digital-red su-text-hocus-white su-after-bg-digital-red su-after-bg-hocus-white': 'bg-white hocus:bg-plum-dark text-digital-red hocus:text-white after:bg-digital-red ',
  'ood-cta__button--ghost su-after-bg-white': 'text-white bg-transparent shadow-white shadow-[inset_0_0_0_1px] transition-shadow hocus:text-white hocus:shadow-[inset_0_0_0_3px]  ',
  'su-bg-plum su-bg-hocus-plum-dark su-text-white su-text-hocus-white su-after-bg-white su-after-bg-hocus-white': 'bg-plum hocus:bg-plum-dark text-white hocus:text-white  ',
  'su-bg-cardinal-dark-to-spirited-dark su-bg-hocus-plum-dark su-text-white su-text-hocus-white su-after-bg-white su-after-bg-hocus-white su-transition-none': 'from-cardinal-dark to-spirited-dark hocus:bg-plum-dark text-white hocus:text-white   transition-none',
  'su-bg-plum-to-digital-red su-bg-hocus-plum-dark su-text-white su-text-hocus-white su-after-bg-white su-after-bg-hocus-white su-transition-none': 'from-plum to-digital-red hocus:bg-plum-dark text-white hocus:text-white transition-none',
  'su-bg-plum-to-spirited-dark su-bg-hocus-plum-dark su-text-white su-text-hocus-white su-after-bg-white su-after-bg-hocus-white su-transition-none': 'from-plum to-spirited-dark hocus:bg-plum-dark text-white hocus:text-white transition-none',
  'su-bg-palo-alto-dark-to-palo-verde-dark su-bg-hocus-plum-dark su-text-white su-text-hocus-white su-after-bg-white su-after-bg-hocus-white su-transition-none': 'from-palo-alto-dark to-palo-verde-dark hocus:bg-plum-dark text-white hocus:text-white transition-none',
  'su-bg-sky-dark-to-olive-dark su-bg-hocus-plum-dark su-text-white su-text-hocus-white su-after-bg-white su-after-bg-hocus-white su-transition-none': 'from-sky-dark to-olive-dark hocus:bg-plum-dark text-white hocus:text-white transition-none',
  'su-bg-sky-dark-to-bay-dark su-bg-hocus-plum-dark su-text-white su-text-hocus-white su-after-bg-white su-after-bg-hocus-white su-transition-none': 'from-sky-dark to-bay-dark hocus:bg-plum-dark text-white hocus:text-white transition-none',
};

// Only used for the text link style
export const ctaTextColors = {
  'su-text-digital-red su-after-bg-digital-red su-text-hocus-sky-dark su-after-bg-hocus-sky-dark': 'text-digital-red after:bg-digital-red hocus:text-sky-dark hocus:after:bg-sky-dark',
  'su-text-white su-text-hocus-white su-hocus-underline su-after-bg-white su-after-bg-hocus-white': 'text-white hocus:text-white hocus:underline  ',
  'ood-cta__link-gradient su-bg-sky-dark-to-bay-dark su-after-bg-sky-dark-to-bay-dark': 'bg-clip-text from-sky-dark to-bay-dark after:from-sky-dark after:to-bay-dark',
  'ood-cta__link-gradient su-bg-cardinal-dark-to-spirited-dark su-after-bg-cardinal-dark-to-spirited-dark': 'bg-clip-text from-cardinal-dark to-spirited-dark after:from-cardinal-dark after:to-spirited-dark',
  'ood-cta__link-gradient su-bg-plum-to-digital-red su-after-bg-plum-to-digital-red': 'bg-clip-text from-plum to-digital-red after:from-plum after:to-digital-red',
  'ood-cta__link-gradient su-bg-plum-to-spirited-dark su-after-bg-plum-to-spirited-dark': 'bg-clip-text from-plum to-spirited-dark after:from-plum after:to-spirited-dark',
  'ood-cta__link-gradient su-bg-palo-alto-dark-to-palo-verde-dark su-after-bg-palo-alto-dark-to-palo-verde-dark': 'bg-clip-text from-palo-alto-dark to-palo-verde-dark after:from-palo-alto-dark after:to-palo-verde-dark',
  'ood-cta__link-gradient su-bg-sky-dark-to-olive-dark su-after-bg-sky-dark-to-olive-dark': 'bg-clip-text from-sky-dark to-olive-dark after:from-sky-dark after:to-olive-dark',
  // TODO: Has an extra su-after-bg-sky-dark-to-bay-dark in SB
  'ood-cta__link-gradient su-bg-sky-dark-to-bay-dark': 'bg-clip-text from-sky-dark to-bay-dark',
  'su-text-lagunita-dark su-after-bg-lagunita-dark su-text-hocus-plum-dark su-after-bg-hocus-plum-dark': 'text-lagunita-dark after:bg-lagunita-dark hocus:text-plum-dark hocus:after:bg-plum-dark',
  'su-text-palo-verde su-after-bg-palo-verde su-text-hocus-plum-dark su-after-bg-hocus-plum-dark': 'text-palo-verde after:bg-palo-verde hocus:text-plum-dark hocus:after:bg-plum-dark',
  'su-text-plum su-after-bg-plum su-text-hocus-plum-dark su-after-bg-hocus-plum-dark': 'text-plum after:bg-plum hocus:text-plum-dark hocus:after:bg-plum-dark',
  'su-text-brick su-after-bg-brick su-text-hocus-plum-dark su-after-bg-hocus-plum-dark': 'text-brick after:bg-brick hocus:text-plum-dark hocus:after:bg-plum-dark',
  'su-text-cardinal-red su-after-bg-cardinal-red su-text-hocus-plum-dark su-after-bg-hocus-plum-dark': 'text-cardinal-red after:bg-cardinal-red hocus:text-plum-dark hocus:after:bg-plum-dark',
  'su-text-palo-alto su-after-bg-palo-alto su-text-hocus-plum-dark su-after-bg-hocus-plum-dark': 'text-palo-alto after:bg-palo-alto hocus:text-plum-dark hocus:after:bg-plum-dark',
  'su-text-bay-dark su-after-bg-bay-dark su-text-hocus-plum-dark su-after-bg-hocus-plum-dark': 'text-bay-dark after:bg-bay-dark hocus:text-plum-dark hocus:after:bg-plum-dark',
  'su-text-sky-dark su-after-bg-sky-dark su-text-hocus-plum-dark su-after-bg-hocus-plum-dark': 'text-sky-dark after:bg-sky-dark hocus:text-plum-dark hocus:after:bg-plum-dark',
  'su-text-lagunita su-after-bg-lagunita su-text-hocus-plum-dark su-after-bg-hocus-plum-dark': 'text-lagunita after:bg-lagunita hocus:text-plum-dark hocus:after:bg-plum-dark',
};

// Only used for the button styles
export const ctaButtonSizes = {
  default: 'pt-11 pb-12 px-30 text-18 lg:text-20',
  medium: 'pt-11 pb-12 px-30 md:py-14 md:px-34 text-20 md:text-24',
  large: 'py-16 px-30 md:py-20 md:px-36 text-22 md:text-28',
};

export const ctaIcons = {
  'su-link--action': 'chevron-right',
  'su-link--jump': 'chevron-down',
  'su-link--external': 'external',
  'su-link--internal': 'lock',
  'su-link--download': 'download',
  'su-link--video': 'video',
  'su-link--no-icon': '',
};

export const icon = 'inline-block shrink-0 will-change-transform transition-transform stroke-2';

export const iconStyles = {
  'ghost-swipe': 'group-hover/cta:text-white group-focus-visible/cta:text-white',
  close: 'text-lagunita-light group-hover/cta:text-lagunita-dark group-focus-visible/cta:text-lagunita-dark !w-22 -mt-4',
  'close-x': 'text-current hocus:text-current w-22 group-hover/cta:underline group-focus-visible/cta:underline',
  mainNavFeatured: '!w-1em text-digital-red-xlight stroke-[3]',
};

export const iconColors = {
  default: '',
  'red-xlight-hocus-white': '!text-digital-red-xlight group-hover/cta:!text-white group-focus-visible/cta:!text-white',
};

export const iconAnimation = {
  none: '',
  'top-right': 'group-hover/cta:translate-x-01em group-focus-visible/cta:translate-x-01em group-hover/cta:-translate-y-01em group-focus-visible/cta:-translate-y-01em',
  down: 'group-hover/cta:translate-y-02em group-focus-visible/cta:translate-y-02em',
  up: 'group-hover/cta:-translate-y-02em group-focus-visible/cta:-translate-y-02em',
  right: 'group-hover/cta:translate-x-02em group-focus-visible/cta:translate-x-02em',
  left: 'group-hover/cta:-translate-x-02em group-focus-visible/cta:-translate-x-02em',
};

// Icons have left margins
// Only add to this map if left margin is different from default class ml-03em
export const iconLeftMarginDefault = 'ml-03em';
export const iconLeftMargin: CtaIconLeftMarginType = {
  'arrow-right': 'ml-04em',
  email: 'ml-05em',
  external: 'ml-04em',
  link: 'ml-05em',
};
