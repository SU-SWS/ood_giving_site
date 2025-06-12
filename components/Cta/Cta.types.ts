import { type HeroIconProps, type IconType } from '@/components/HeroIcon';
import { type MarginType } from '@/utilities/datasource';
import * as styles from './Cta.styles';

export type CtaButtonStyleType = keyof typeof styles.ctaButtonStyles;
export type CtaTextColorType = keyof typeof styles.ctaTextColors;
export type CtaButtonSizeType = keyof typeof styles.ctaButtonSizes;

export type CtaIconType = keyof typeof styles.ctaIcons;
export type IconColorType = keyof typeof styles.iconColors;
export type IconAnimationType = keyof typeof styles.iconAnimation | '';

export type CtaIconLeftMarginType = Partial<{
  [Key in IconType]: string;
}>;

export interface CtaCommonProps {
  srText?: string;
  icon?: IconType;
  isButton?: boolean;
  textColor?: CtaTextColorType;
  buttonSize?: CtaButtonSizeType;
  buttonStyle?: CtaButtonStyleType;
  align?: 'left' | 'center' | 'right';
  rel?: string;
  iconProps?: Omit<HeroIconProps, 'icon'> & React.ComponentProps<'svg'>;
  mt?: MarginType;
  mb?: MarginType;
  children?: React.ReactNode;
}
