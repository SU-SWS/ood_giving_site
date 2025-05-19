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
  'callout': 'leading-display font-sans type-2 font-semibold',
  'splash-text': 'leading-display font-serif type-3 font-bold',
};
export type WysiwygClassesType = keyof typeof wysiwygClasses;
