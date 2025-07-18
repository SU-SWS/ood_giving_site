import { cnb } from 'cnbuilder';
import { gradientOverlays, type GradientOverlayType, type LightPageBgColorType } from '@/utilities/datasource';

export const root = (sectionBgColor: LightPageBgColorType) => cnb(
  'relative w-full z-0 border-b-[6rem] md:border-b-[8rem]',
  sectionBgColor === 'fog-light' ? 'border-fog-light' : 'border-white',
);

export const overlay = (overlay: GradientOverlayType) => cnb(
  'absolute inset-0 z-1',
  gradientOverlays[overlay],
);
