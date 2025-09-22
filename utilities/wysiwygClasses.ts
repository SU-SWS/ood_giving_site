/**
 * Custom classes that are used in Storyblok rich text fields, e.g., in Single Column Content component and page intros.
 */

export const wysiwygClasses = {
  // Pseudo elements, e.g., used for decorative tabs above headings
  'ood-has-tab-before': 'before:block before:mb-03em before:content-[""] before:h-10 before:w-80 before:bg-cardinal-red',
  'su-before-bg-bay-dark': 'before:!bg-bay-dark',
  // Typography
  'su-sans': 'font-sans',
  'su-serif': 'font-serif',
  'su-semibold': 'font-semibold',
  'su-bold': 'font-bold',
  'su-italic': 'italic',
  'intro-text': 'text-20 md:text-25 lg:text-29',
  'callout': 'leading-display font-sans type-2 font-semibold',
  'splash-text': 'leading-display font-serif type-3 font-bold',
  // CTA styles
  'ood-cta__link': 'text-digital-red group-hocus-within:text-sky-dark',
  'su-link--action': 'inline-block no-underline group-hocus-within:underline transition-colors no-underline group-hocus-within:underline',
  'ood-cta__button': 'pt-11 px-30 pb-12 font-sans inline-block font-normal group-hocus-within:underline transition-colors',
  'ood-cta__button--primary': 'bg-bay-dark text-white group-hocus-within:bg-palo-alto group-hocus-within:text-white underline decoration-bay-dark group-hocus-within:decoration-white',
};
export type WysiwygClassesType = keyof typeof wysiwygClasses;
