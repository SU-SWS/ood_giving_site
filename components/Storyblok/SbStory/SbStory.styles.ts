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

export const article = 'bg-white';

export const headerColorBlock = (headerBackgroundColor: BgColorType) => cnb(
  'w-full h-160 md:h-220 xl:h-260',
  bgColors[headerBackgroundColor],
);

export const image = 'h-300 md:h-400 xl:h-500 2xl:h-[64rem]';

export const headerContent = 'relative';

export const introbox = (showImage: boolean, headerBoxColor: BgColorType) => cnb(
  'rs-px-4 lg:w-10/12 2xl:w-9/12 mx-auto',
  bgColors[headerBoxColor],
  showImage ? '-mt-[8em]' : '-mt-140 sm:-mt-130 md:-mt-140 xl:-mt-180 xl:min-h-[22rem]',
);

export const intro = 'text-pretty';

export const title = (tabColor: LightBeforeColorType) => cnb(
  'text-pretty before:block before:rs-mb-3 before:content-[""] before:h-10 before:w-80',
  lightBeforeColors[tabColor],
);

export const storyContent = 'first:*:rs-pt-4 last:*:rs-pb-5';

export const cta = 'lg:w-8/12 mx-auto rs-mb-2';

export const metadata = 'lg:w-8/12 mx-auto';

export const metadataHeading = 'text-16';

export const author = 'mb-[1.6em] last:mb-0';
