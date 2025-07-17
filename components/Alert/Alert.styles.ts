import { cnb } from 'cnbuilder';
import { type SbAlertBgColorType } from '@/components/Storyblok/SbAlert';

export const alertBgTextColors: Record<SbAlertBgColorType, string> = {
  'blue': 'text-white',
  'green': 'text-white',
  'red': 'text-white',
  'light-grey': 'text-black',
  'yellow': 'text-black',
};

export const alert = (bg: SbAlertBgColorType) => cnb(alertBgTextColors[bg], {
  'text-white': alertBgTextColors[bg] === 'text-white',
  'text-black': alertBgTextColors[bg] === 'text-black',
});

export const alertContainer = 'cc gap-x-26 gap-y-16 lg:gap-y-18 xl:gap-y-19 rs-py-0 flex-col lg:flex-row items-start lg:items-center';
export const alertHeader = 'flex-grow-0 gap-x-8';
export const alertLabel = 'uppercase text-18 tracking-widest font-semibold';
export const alertMain = 'flex-1 gap-x-26 gap-y-16 lg:gap-y-18 xl:gap-y-19 flex-col sm:flex-row items-end sm:items-center';

export const alertContentWrapper = 'flex-1';

export const alertContent = (bg: SbAlertBgColorType) => cnb({
  '[&_a]:!text-white': alertBgTextColors[bg] === 'text-white',
  '[&_a]:!text-black': alertBgTextColors[bg] === 'text-black',
});

export const alertCtaWrapper = 'rs-mt-0';

export const alertCta = (bg: SbAlertBgColorType) => cnb({
  'text-white hocus:text-white': alertBgTextColors[bg] === 'text-white',
  'text-black hocus:text-black': alertBgTextColors[bg] === 'text-black',
});

export const alertDismissButton = (bg: SbAlertBgColorType) => cnb(
  'flex items-center gap-8 flex-grow-0 uppercase tracking-widest font-semibold !text-18',
  {
    'text-white hocus:text-white': alertBgTextColors[bg] === 'text-white',
    '!text-black hocus:!text-black': alertBgTextColors[bg] === 'text-black',
  },
);
