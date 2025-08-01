import { cnb } from 'cnbuilder';
import { type AllCardBgColorType, allCardBgColors } from '@/utilities/datasource';

/**
 * Campaign Header
 */
export const headerRoot = (isWhiteHeader: boolean) => cnb(
  'relative cc h-80 md:h-150',
  isWhiteHeader && 'after:absolute after:z-[4] after:inset-0 after:bg-gradient-to-b after:from-sky-dark via:sky-dark/80 via-40%',
);

export const lockupWrapper = 'max-sm:mt-2 lg:pb-10 text-21 sm:text-25 md:text-[3.2rem] z-10';

export const logoLink = 'z-10';

export const logoImage = 'max-h-60 md:max-h-110';

export const homeLink = 'flex flex-col-reverse items-center text-12 sm:text-14 md:text-16 z-10 shrink-0';

export const homeIcon = 'w-20 md:w-24';

/**
 * Campaign Hero
 */
export const logoAlignments = {
  'su-mr-auto': 'mr-auto',
  'su-ml-auto': 'ml-auto',
  'su-mx-auto': 'mx-auto',
};
export type LogoAlignmentType = keyof typeof logoAlignments;

export const heroContentPositions = {
  left: 'mr-auto ml-0',
  right: 'ml-auto mr-0',
  center: 'mx-auto',
};
export type HeroContentPositionType = keyof typeof heroContentPositions;

export const heroContentAlignments = {
  'su-text-align-left': 'text-left',
  'su-text-align-center': 'text-center',
  'su-text-align-right': 'text-right',
};
export type HeroContentAlignmentType = keyof typeof heroContentAlignments;

export const barAlignments = {
  'su-text-align-left': 'mr-auto ml-0',
  'su-text-align-center': 'mx-auto',
  'su-text-align-right': 'ml-auto mr-0',
};

export const heroRoot = (isFullWidthImage: boolean) => cnb(
  'relative flex flex-col -mt-80 md:-mt-150 lg:min-h-[75rem]',
  isFullWidthImage ? 'cc lg:justify-center rs-pb-6 pt-110 md:pt-180' : 'lg:flex-row *:basis-1/2',
);

export const heroBgNoImage = 'bg-fog-light';

export const heroImageWrapper = (isFullWidthImage: boolean) => isFullWidthImage ? 'absolute inset-0' : '';

export const heroImage = (isFullWidthImage: boolean) => cnb('h-full', !isFullWidthImage && 'max-lg:max-h-600');

export const contentWrapper = (
  isFullWidthImage: boolean,
  heroContentPosition: HeroContentPositionType,
  heroBgColor: AllCardBgColorType,
) => cnb(
  'z-[5] break-words',
  isFullWidthImage ? 'cc sm:w-9/12 md:w-8/12 lg:w-7/12 xl:w-1/2' : '',
  !isFullWidthImage ? allCardBgColors[heroBgColor] : heroContentPositions[heroContentPosition],
);

export const contentInnerWrapper = (
  isFullWidthImage: boolean,
  heroBgColor: AllCardBgColorType,
) => cnb(
  isFullWidthImage && allCardBgColors[heroBgColor],
  isFullWidthImage ? 'rs-p-4' : 'lg:mt-120 3xl:max-w-[75rem] py-45 lg:pt-90 2xl:pt-95 lg:pb-72 2xl:pb-76 px-20 sm:px-30 md:px-50 lg:pr-80 xl:pl-80 xl:pr-100 2xl:pl-100 3xl:pr-0',
);

export const heroLogo = (logoAlignment: LogoAlignmentType, isFullWidthImage: boolean) => cnb(
  'max-md:max-h-150 w-auto',
  isFullWidthImage ? 'max-w-full 2xl:max-w-[43rem]' : 'max-w-[22rem] lg:max-w-[33rem] 2xl:max-w-[43rem]',
  logoAlignments[logoAlignment],
);

export const heading = (heroContentAlignment: HeroContentAlignmentType) => cnb(
  'first:mt-0 text-pretty',
  heroContentAlignments[heroContentAlignment],
);

export const intro = (heroContentAlignment: HeroContentAlignmentType) => cnb(
  'text-20 md:text-25 leading-cozy text-pretty',
  heroContentAlignments[heroContentAlignment],
);

export const bar = (barBgColor: AllCardBgColorType, heroContentAlignment: HeroContentAlignmentType) => cnb(
  'w-100 h-10 mt-15 sm:mt-30',
  allCardBgColors[barBgColor || 'white'],
  barAlignments[heroContentAlignment],
);

export const ctaWrapper = 'rs-mt-4 empty:hidden';
