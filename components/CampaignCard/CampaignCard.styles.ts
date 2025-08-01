import { cnb } from 'cnbuilder';

export const gradientLinkBase = 'bg-clip-text bg-gradient-to-tr text-transparent';

export const headlineColors = {
  'cardinal-red': 'text-cardinal-red',
  'digital-red': 'text-digital-red',
  'palo-alto': 'text-palo-alto',
  'bay-dark': 'text-bay-dark',
  lagunita: 'text-lagunita',
  'lagunita-dark': 'text-lagunita-dark',
  'sky-dark': 'text-sky-dark',
  'palo-verde-dark': 'text-palo-verde-dark',
  'gradient-cardinal-dark-to-spirited-dark su-text-gradient': `${gradientLinkBase} from-cardinal-red-dark to-spirited-dark *:[&_svg]:text-spirited-dark`,
  'gradient-plum-to-digital-red  su-text-gradient': `${gradientLinkBase} from-plum to-digital-red *:[&_svg]:text-digital-red`,
  'gradient-plum-to-spirited-dark  su-text-gradient': `${gradientLinkBase} from-plum to-spirited-dark *:[&_svg]:text-spirited-dark`,
  'gradient-palo-alto-dark-to-palo-verde-dark  su-text-gradient': `${gradientLinkBase} from-palo-alto-dark to-palo-verde-dark *:[&_svg]:text-palo-verde-dark`,
  'gradient-sky-dark-to-olive-dark  su-text-gradient': `${gradientLinkBase} from-sky-dark to-olive-dark *:[&_svg]:text-olive-dark`,
  'gradient-sky-dark-to-bay-dark  su-text-gradient': `${gradientLinkBase} from-sky-dark to-bay-dark *:[&_svg]:text-bay-dark`,
};
export type HeadlineColorType = keyof typeof headlineColors;

export const root = 'relative group break-words max-w-[42rem] mx-auto';

export const image = 'overflow-hidden rs-mb-1 group-hocus-within:[&_img]:scale-105 [&_img]:transition-transform';

export const superhead = 'text-16 mb-8';

export const heading = (headlineColor: HeadlineColorType) => headlineColors[headlineColor || 'digital-red'];

export const link = 'stretched-link font-semibold no-underline hocus:underline hocus:text-plum-dark *:[&_svg]:hocus:text-plum-dark';

export const linkText = (headlineColor: HeadlineColorType) => cnb('inline-block no-underline group-hocus-within:text-plum-dark group-hocus-within:underline', headlineColors[headlineColor || 'digital-red']);

export const icon = 'ml-02em w-07em stroke-2 group-hocus-within:translate-x-01em group-hocus-within:-translate-y-01em';

export const description = 'text-20 rs-mt-0';
