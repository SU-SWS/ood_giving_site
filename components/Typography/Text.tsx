import { ReactNode, TimeHTMLAttributes } from 'react';
import { cnb } from 'cnbuilder';
import { marginTops, marginBottoms, type MarginType } from '@/utilities/datasource';
import * as styles from './typography.styles';
import * as types from './typography.types';

export type TypographyProps = {
  as?: types.TextType;
  font?: types.FontFamilyType;
  size?: types.FontSizeType;
  weight?: types.FontWeightType;
  align?: types.TextAlignType;
  color?: types.TextColorType;
  variant?: types.TextVariantType;
  leading?: types.FontLeadingType;
  italic?: boolean;
  srOnly?: boolean;
  uppercase?: boolean;
  mt?: MarginType;
  mb?: MarginType;
  className?: string;
  children?: ReactNode;
};

// The TimeHTMLAttributes<HTMLElement> is for the dateTime attribute when using as="time"
export type TextProps = TypographyProps & React.HTMLAttributes<HTMLElement> & TimeHTMLAttributes<HTMLElement>;

export const Text = ({
  as: AsComponent = 'div',
  font = 'sans',
  size,
  weight,
  align,
  color = 'default',
  variant,
  leading,
  italic,
  srOnly,
  uppercase,
  mt,
  mb,
  className,
  children,
  ...rest
}: TextProps) => (
  <AsComponent
    {...rest}
    className={
      cnb(
        font && styles.fontFamilies[font],
        size && styles.fontSizes[size],
        weight && styles.fontWeights[weight],
        align && styles.textAligns[align],
        color && styles.textColors[color],
        variant && styles.textVariants[variant],
        leading && styles.fontLeadings[leading],
        italic && 'italic',
        srOnly && 'sr-only',
        uppercase && 'uppercase',
        mt && marginTops[mt],
        mb && marginBottoms[mb],
        className,
      )
    }
  >
    {children}
  </AsComponent>
);
