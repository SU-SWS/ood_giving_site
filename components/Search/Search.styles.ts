import { cnb } from 'cnbuilder';
import { type SearchFormVariant } from './Search.types';

/**
 * Search button
 */
export const searchButton = 'relative ml-auto shrink-0 xl:-top-6 h-40 w-40 xl:w-fit text-digital-red hocus:text-cardinal-red rounded-full xl:text-20 xl:px-20 border border-black-30 hocus:bg-black-10 transition-colors';
export const searchButtonText = 'max-xl:sr-only leading-none xl:mr-6';
export const searchButtonIcon = 'inline-block relative -top-1 w-22 lg:w-20 h-18';

/**
 * Search form
 */
export const searchFormInput = ({ variant = 'default' }: { variant?: SearchFormVariant } = {}) => cnb(
  'w-full bg-transparent border-t-0 border-x-0 border-b-1 pr-90 sm:pr-100 md:pr-110 font-semibold focus:!ring-0',
  {
    'border-b-black-80 text-black focus:border-b-cardinal-red focus:bg-black/5 text-30 placeholder:black-80': variant === 'default',
    'border-b-white text-white focus:border-b-white focus:bg-white/5 text-26 sm:text-30 md:text-[4rem] lg:text-[4.5rem] placeholder:text-foggy': variant === 'modal',
  },
);

export const searchFormErrorMessage = ({ show = false }: { show?: boolean } = {}) => cnb({
  'invisible': !show,
  'visible': show,
});

export const searchFormOptions = ({ variant = 'default' }: { variant?: SearchFormVariant } = {}) => cnb(
  'empty:invisible absolute z-[1000002] top-full left-0 flex flex-col w-full list-none m-0 p-16 border border-t-0 overflow-hidden rounded-bl-[5px] rounded-br-[5px] cursor-pointer',
  {
    'bg-white text-black border-cardinal-red': variant === 'default',
    'bg-palo-alto-dark text-white border-white': variant === 'modal',
  },
);

export const searchFormOption = ({ variant = 'default' }: { variant?: SearchFormVariant } = {}) => cnb(
  'px-4 py-8 rounded-[8px] mb-0',
  {
    'data-[focus]:bg-black-10 data-[focus]:underline data-[focus]:text-cardinal-red-dark': variant === 'default',
    'data-[focus]:bg-bay-light data-[focus]:text-palo-alto-dark data-[focus]:underline': variant === 'modal',
  },
);

export const searchFormResetButton = ({ variant = 'default' }: { variant?: SearchFormVariant } = {}) => cnb(
  'absolute flex gap-6 items-center justify-center text-16 sm:text-18 md:text-20 min-h-24 hocus:underline',
  {
    'text-black top-14 right-80': variant === 'default',
    'text-white top-14 sm:top-18 md:top-22 lg:top-28 right-70 sm:right-76 md:right-100': variant === 'modal',
  },
);

export const searchFormSubmitButton = ({ variant = 'default' }: { variant?: SearchFormVariant } = {}) => cnb(
  'flex items-center justify-center rounded-full bg-cardinal-red hocus:bg-plum transition-colors',
  {
    'p-8': variant === 'default',
    'p-12': variant === 'modal',
  },
);

export const searchFormSubmitButtonIcon = ({ variant = 'default' }: { variant?: SearchFormVariant } = {}) => cnb(
  'text-white aspect-1',
  {
    'w-36': variant === 'default',
    'w-24 sm:w-30 md:w-40 lg:w-50': variant === 'modal',
  },
);

/**
 * Pagination
 */
export const pageList = 'flex items-center justify-between sm:justify-center w-full p-0 list-none gap-4 sm:gap-12 md:gap-16 xl:gap-24';
export const pageListItem = 'm-0 w-full sm:w-auto';
export const pageItemCommon = 'flex items-center justify-center min-w-24 min-h-36 pb-4 text-cardinal-red font-semibold font-serif leading-none no-underline';
export const pageItemCommonHocus = 'hocus:border-b-4 hocus:pb-0 hocus:border-digital-blue hocus:text-digital-blue hocus:no-underline';
export const pageEllipsis = cnb(pageItemCommon, 'pb-4 font-semibold !text-black');

export const directionCta = ({ isShown = false } = {}) => cnb(
  'flex items-center justify-center uppercase text-16 min-w-34 md:min-w-40 min-h-36 leading-none text-black no-underline pb-4',
  pageItemCommonHocus,
  {
    'invisible': !isShown,
    'visible': isShown,
  },
);

export const pageCta = ({ isActive = false } = {}) => cnb(pageItemCommon, pageItemCommonHocus, 'text-24', {
  'border-b-4 !border-black !pb-0 !text-black': isActive,
});
