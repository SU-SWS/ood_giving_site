import { cnb } from 'cnbuilder';
import {
  bgColors,
  type BgColorType,
  lightBeforeColors,
  type LightBeforeColorType,
} from '@/utilities/datasource';

/**
 * Story page
 */

export type DisplayImageType = 'show-image' | 'hide-image';

export const introbox = (headerBoxColor: BgColorType, showImage: boolean) => cnb('rs-px-4 lg:basis-10/12 2xl:basis-9/12 mx-auto',
  bgColors[headerBoxColor],
  showImage && '-mt-[8em]',
);
export const title = (tabColor: LightBeforeColorType) => cnb(
  'before:block before:rs-mb-3 before:content-[""] before:h-10 before:w-80',
  lightBeforeColors[tabColor],
);
