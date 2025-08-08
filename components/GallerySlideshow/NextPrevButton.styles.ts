import { cnb } from 'cnbuilder';

export const root = (isLightText: boolean) => cnb(
  'group flex items-center justify-center size-40 md:size-55 rounded-full border-3 shrink-0 transition-colors',
  isLightText ? 'border-white hocus-visible:border-white hocus-visible:bg-white' : 'border-bay-dark hocus-visible:border-bay-dark hocus-visible:bg-bay-dark',
);

export const icon = (isLightText: boolean) => cnb(
  'inline-block stroke-[3px] w-20 md:w-24',
  isLightText ? 'text-white group-hocus-visible:text-bay-dark' : 'text-bay-dark group-hocus-visible:text-white',
);
