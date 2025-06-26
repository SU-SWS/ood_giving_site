import { cnb } from 'cnbuilder';
import { type DarkBeforeColorType, darkBeforeColors } from '@/utilities/datasource';

export const sectionContentWidths = {
  'edge-to-edge': 'w-full',
  'centered-container': 'w-full',
  'flex-xl-10-of-12': '',
  'flex-lg-10-of-12 flex-xl-8-of-12': '',
};
export type SectionContentWidthType = keyof typeof sectionContentWidths;

export const titleStyles = {
  'ood-has-tab-before': 'before:block before:mb-03em before:content-[""] before:h-10 before:w-80',
  'su-italic': 'font-italic',
};
export type TitleStyleType = keyof typeof titleStyles;

export const title = (titleStyle: TitleStyleType[], tabColor: DarkBeforeColorType) => cnb('', {
  [titleStyles['ood-has-tab-before']]: titleStyle.includes('ood-has-tab-before'),
  [titleStyles['su-italic']]: titleStyle.includes('su-italic'),
},
  titleStyle.includes('ood-has-tab-before') ? darkBeforeColors[tabColor || 'cardinal-red'] : '',
);
