import { cnb } from 'cnbuilder';
import { type DarkBeforeColorType, darkBeforeColors } from '@/utilities/datasource';

// TODO: Think about whether to finetune old flex width classes at the end
// https://stanford.atlassian.net/browse/DS-1433
export const sectionContentWidths = {
  'edge-to-edge': 'w-full',
  'centered-container': 'w-full',
  'flex-xl-10-of-12': 'xl:w-10/12',
  'flex-lg-10-of-12 flex-xl-8-of-12': 'lg:w-10/12 xl:w-8/12',
};
export type SectionContentWidthType = keyof typeof sectionContentWidths;

export const header = (srOnlyHeader: boolean) => srOnlyHeader && 'sr-only';

export const titleStyles = {
  'ood-has-tab-before': 'before:block before:mb-03em before:content-[""] before:h-10 before:w-80',
  'su-italic': 'italic',
};
export type TitleStyleType = keyof typeof titleStyles;

export const title = (titleStyle: TitleStyleType[], tabColor: DarkBeforeColorType, isCenterAlignHeader: boolean) => {
  const styleSet = new Set(titleStyle);
  const hasTabBefore = styleSet.has('ood-has-tab-before');
  const isItalic = styleSet.has('su-italic');

  return cnb('w-fit max-w-1200 last:mb-0', {
    [titleStyles['ood-has-tab-before']]: hasTabBefore,
    [titleStyles['su-italic']]: isItalic,
  },
    hasTabBefore && darkBeforeColors[tabColor || 'cardinal-red'],
    isCenterAlignHeader && 'mx-auto',
  );
};

export const intro = (srOnlyHeader: boolean, isCenterAlignHeader: boolean) => cnb(
  'text-pretty',
  srOnlyHeader && 'sr-only',
  // In Gatsby build, the intro width is 100% when left aligned, but I added max-w-prose-wide here for better readability
  isCenterAlignHeader ? '*:*:mx-auto *:*:max-w-800' : '*:*:max-w-prose-wide',
);

export const content = (contentWidth: SectionContentWidthType) => cnb('mx-auto', sectionContentWidths[contentWidth || 'centered-container']);
