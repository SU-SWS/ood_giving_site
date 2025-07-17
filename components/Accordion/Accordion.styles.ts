import { cnb } from 'cnbuilder';

export const accordionColors = {
  'digital-red': 'border-digital-red',
  'palo-alto-light': 'border-palo-alto-light',
};
export type AccordionColorType = keyof typeof accordionColors;

export const root = 'relative mx-auto w-full max-w-1000';
export const title = 'text-pretty';
export const intro = '*:max-w-prose *:*:leading-snug *:*:md:leading-cozy';
export const controls = 'mb-4 gap-20 rs-mt-2 first:mt-0';
export const expandAllIcon = '-mt-01em';
export const collapseAllIcon = '-mt-02em';

// Accordion item
export const list = 'list-unstyled rs-mt-1';
export const listItem = (color: AccordionColorType) => cnb('relative mb-0 border-b first:border-t', accordionColors[color || 'palo-alto-light']);
export const itemHeading = 'relative w-full mb-0 text-18 md:type-1 md:leading-display';
export const button = 'group relative flex items-center w-full text-left pr-40 md:pr-60 pt-16 pb-18 pl-12 md:pl-20 hocus:underline';
export const bar = 'absolute top-0 left-0 group-hocus:w-6 group-hocus:md:w-8 scale-y-0 transition-transform group-hocus:scale-y-100 bottom-0 bg-black';

export const circleIcon = (color: AccordionColorType) => cnb(
  'shrink-0 grow-0 absolute right-10 md:right-20 w-24 h-24 md:w-28 md:h-28 border-2 p-2 md:p-3 rounded-full',
  color === 'digital-red' ? 'border-digital-red/60 text-digital-red' : 'border-palo-alto-light/60 text-palo-alto-light',
);

export const contentWrapper = 'overflow-clip';
export const richtextWrapper = 'rs-pt-0 rs-pb-2 pl-10 md:px-20';
export const richtext = '*:max-w-prose-wide';
