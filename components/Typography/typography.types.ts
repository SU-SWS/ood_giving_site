import * as styles from './typography.styles';

export type HeadingLevelNumberType = 1 | 2 | 3 | 4 | 5 | 6;
export type HeadingType = `h${HeadingLevelNumberType}`;

export type NonHeadingTypographyType = 'p' | 'span' | 'div' | 'figcaption' | 'blockquote' | 'cite' | 'strong' | 'em' | 'del' | 'sub' | 'sup' | 'address' | 'pre' | 'li' | 'time';

export type TextType = HeadingType | NonHeadingTypographyType;

export type FontFamilyType = keyof typeof styles.fontFamilies;

export type FontWeightType = keyof typeof styles.fontWeights;

export type FontSizeType = keyof typeof styles.fontSizes;

export type FontLeadingType = keyof typeof styles.fontLeadings;

export type TextAlignType = keyof typeof styles.textAligns;

export type TextColorType = keyof typeof styles.textColors;

export type TextVariantType = keyof typeof styles.textVariants;
