import { cnb } from 'cnbuilder';

export const containerWidths = {
  'constrain-max-width': 'w-full xl:w-10/12 2xl:w-8/12 mx-auto',
  'fit-container': 'w-full',
};
export type ContainerWidthType = keyof typeof containerWidths;

export const root = 'relative max-sm:mt-50 mx-auto sm:w-[calc(100%_-12rem)] md:w-[calc(100%_-17rem)]';

export const slider = (containerWidth: ContainerWidthType) => cnb('leading-none', containerWidths[containerWidth]);
export const buttonWrapper = 'gap-16 mt-10 sm:mt-0';
export const buttonBase = 'absolute -top-50 sm:top-[calc(33cqw_-2rem)] sm:top-[calc(33cqw_-2.7rem)]';
export const nextButton = `${buttonBase} right-55 sm:-left-60 md:-left-80`;
export const prevButton = `${buttonBase} right-0 sm:-right-60 md:-right-80`;

export const pagerWindow = 'rs-pt-0 relative hidden sm:block overflow-hidden';
export const pagerList = 'list-unstyled *:mb-0 *:leading-[0] gap-10 transition-transform';
export const thumbButton = (active: boolean, isPortrait: boolean) => cnb(
  'inline-block hocus-visible:opacity-100 hocus-visible:border-bay-dark hocus-visible:-translate-y-5 transition-all border-5',
  active ? 'opacity-100 border-bay-dark -translate-y-5' : 'opacity-70 border-transparent',
  isPortrait ? 'w-50 md:w-65' : 'w-80 md:w-100',
);
export const expandButton = 'group hidden mb-03em sm:block mx-auto font-semibold leading-none card text-bay-dark hocus-visible:text-black hocus-visible:underline [transform:translate3d(0,0,0)]';
export const expandIcon = 'inline-block ml-02em group-hocus-visible:scale-110';
export const skipButton = 'hidden sm:block skiplink focus:!relative left-0 -top-30 break-words type-0 whitespace-normal';

// Modal styles
export const dialog = 'hidden sm:block relative z-[150]';
export const srOnly = 'sr-only';
export const dialogOverlay = 'fixed inset-0 bg-palo-alto-dark/90 backdrop-blur-lg w-screen';
export const dialogWrapper = 'fixed inset-0 w-screen bg-black-true/30 overflow-y-auto overscroll-contain overflow-x-hidden';
export const dialogPanel = 'relative cc flex flex-col w-screen inset-0 break-words justify-start text-white';
export const modalClose = 'absolute top-20 z-[200] right-0 block mr-0 ml-auto rs-mb-2 p-9 border-2 border-digital-red-xlight bg-black-true rounded-full hocus-visible:border-dashed hocus-visible:border-white transition-transform hocus-visible:rotate-90';
export const modalIcon = 'text-white size-26';
export const contentWrapper = 'relative w-full';

// Modal Slider elements
export const modalSliderWrapper = 'relative mt-90 md:mt-100 mx-auto';
export const modalSlider = 'relative !flex items-center gap-20 md:gap-30 leading-none';
export const belowModalSlider = 'relative mt-9';
export const modalCounter = 'block';
