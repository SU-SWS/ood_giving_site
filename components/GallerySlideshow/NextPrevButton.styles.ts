import { cnb } from 'cnbuilder';

export const root = (isLightText: boolean) => cnb(
  'group flex items-center justify-center size-40 md:size-55 rounded-full border-2 shrink-0 hocus-visible:border-digital-red-light hocus-visible:bg-digital-red-light transition-colors',
  isLightText ? 'border-white' : 'border-gc-black',
);

export const icon = (isLightText: boolean) => cnb(
  'inline-block stroke-[3px] group-hocus-visible:text-white',
  isLightText ? 'text-white' : 'text-gc-black',
);
