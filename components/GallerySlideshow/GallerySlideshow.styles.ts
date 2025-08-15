import { cnb } from 'cnbuilder';

export const containerWidths = {
  'constrain-max-width': 'w-full xl:w-10/12 2xl:w-8/12 mx-auto',
  'fit-container': 'w-full',
};
export type ContainerWidthType = keyof typeof containerWidths;

export const root = 'relative mx-auto';
export const widthWrapper = (containerWidth: ContainerWidthType) => cnb('relative', containerWidths[containerWidth]);
export const slider = 'leading-none';
export const sliderWrapper = '@container w-full sm:w-[calc(100%_-12rem)] md:w-[calc(100%_-_17rem)] mx-auto';

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
export const dialog = 'hidden sm:block';
export const srOnly = 'sr-only';
export const modalContentWrapper = 'relative w-full rs-py-4';

// Modal Slider elements
export const modalSliderRoot = 'relative';
export const modalSliderWrapper = '@container/modal sm:w-[calc(100%_-12rem)] md:w-[calc(100%_-_17rem)] mx-auto';
export const modalSlider = 'relative leading-none';

// Controls styles
export const controlsWrapper = 'max-sm:flex max-sm:gap-20 max-sm:mb-10 w-fit mx-auto sm:w-full';
export const modalControlsWrapper = 'w-full';

export const controlsBase = (showExpandButton: boolean) => cnb('sm:absolute',
  showExpandButton ? 'sm:top-[33cqw] md:top-[calc(33cqw_-0.7rem)]' : 'sm:top-[calc(33cqw_-2rem)] md:top-[calc(33cqw_-2.7rem)]',
);
export const controlLeft = 'sm:left-0';
export const controlRight = 'sm:right-0';

