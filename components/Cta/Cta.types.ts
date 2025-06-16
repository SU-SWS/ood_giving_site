import { type HeroIconProps } from '@/components/HeroIcon';
import { type MarginType } from '@/utilities/datasource';
import * as styles from './Cta.styles';

export type CtaButtonStyleType = keyof typeof styles.ctaButtonStyles;
export type CtaTextColorType = keyof typeof styles.ctaTextColors;
export type CtaButtonSizeType = keyof typeof styles.ctaButtonSizes;
export type CtaVariantType = keyof typeof styles.ctaVariants;
export type CtaAlignType = keyof typeof styles.ctaAligns;

export type CtaIconType = keyof typeof styles.ctaIcons;
export type IconAnimationType = keyof typeof styles.iconAnimations | '';

export type CtaIconLeftMarginType = Partial<{
  [Key in CtaIconType]: string;
}>;

export interface CtaCommonProps {
  srText?: string;
  icon?: CtaIconType;
  isButton?: boolean;
  textColor?: CtaTextColorType;
  buttonSize?: CtaButtonSizeType;
  buttonStyle?: CtaButtonStyleType;
  variant?: CtaVariantType;
  align?: CtaAlignType;
  iconProps?: Omit<HeroIconProps, 'icon'> & React.ComponentProps<'svg'>;
  mt?: MarginType;
  mb?: MarginType;
  children?: React.ReactNode;
}

export type CtaGroupDisplayType = 'inline' | 'inline-block';
