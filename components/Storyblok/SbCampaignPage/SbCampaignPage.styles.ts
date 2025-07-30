import { cnb } from 'cnbuilder';
import { type AllCardBgColorType, allCardBgColors } from '@/utilities/datasource';

/**
 * Campaign Header
 */
export const headerRoot = (isWhiteHeader: boolean) => cnb(
  'relative cc h-80 md:h-120',
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

export const heroTextAlignments = {
  'su-text-align-left': 'text-left',
  'su-text-align-center': 'text-center',
  'su-text-align-right': 'text-right',
};
export type HeroTextAlignmentType = keyof typeof heroTextAlignments;

export const heroRoot = (isFullWidthImage: boolean) => cnb(
  'relative flex flex-col -mt-80 md:-mt-120 lg:min-h-[75rem]',
  isFullWidthImage ? 'cc rs-pb-6 pt-110 md:pt-160' : 'md:flex-row *:basis-1/2',
);

export const heroBgNoImage = 'bg-fog-light';

export const heroImageWrapper = (isFullWidthImage: boolean) => isFullWidthImage ? 'absolute inset-0' : '';

export const heroImage = 'h-full';

export const contentWrapper = (
  isFullWidthImage: boolean,
  heroContentPosition: HeroContentPositionType,
  heroBgColor: AllCardBgColorType,
) => cnb(
  'z-[5] break-words',
  isFullWidthImage ? 'cc sm:w-9/12 xl:w-1/2' : '',
  !isFullWidthImage ? allCardBgColors[heroBgColor] : heroContentPositions[heroContentPosition],
);

export const contentInnerWrapper = (
  isFullWidthImage: boolean,
  heroBgColor: AllCardBgColorType,
) => cnb(
  isFullWidthImage && allCardBgColors[heroBgColor],
  isFullWidthImage ? 'rs-p-4' : 'md:mt-120 sm:max-md:max-w-[42.5rem] 2xl:max-w-[75rem] rs-pt-6 px-20 sm:px-30 rs-pb-5',
);

export const heroLogo = (logoAlignment: LogoAlignmentType) => cnb(
  'max-w-full max-md:max-h-150 w-auto',
  logoAlignments[logoAlignment],
);

export const heading = (heroContentAlignment: HeroTextAlignmentType) => cnb(
  'first:mt-0',
  heroTextAlignments[heroContentAlignment],
);

export const intro = (heroContentAlignment: HeroTextAlignmentType) => cnb(
  'text-20 md:text-25 leading-cozy',
  heroTextAlignments[heroContentAlignment],
);

export const bar = (barBgColor: AllCardBgColorType) => cnb(
  'w-100 h-10 mt-15 sm:mt-30',
  allCardBgColors[barBgColor || 'white'],
);

export const ctaWrapper = 'rs-mt-4';
