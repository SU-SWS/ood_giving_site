import { cnb } from 'cnbuilder';
import { HeroIcon, type HeroIconProps, type IconType } from '@/components/HeroIcon';
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
  icon?: IconType;
  iconProps?: Omit<HeroIconProps, 'icon' | 'noBaseStyle'>;
  className?: string;
  children?: React.ReactNode;
};

// The TimeHTMLAttributes<HTMLElement> is for the dateTime attribute when using as="time"
export type TextProps = TypographyProps & React.HTMLAttributes<HTMLElement> & React.TimeHTMLAttributes<HTMLElement>;

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
  icon,
  iconProps,
  className,
  children,
  ...rest
}: TextProps) => {
  const { className: iconClasses, ...iProps } = iconProps || {};

  return (
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
      {icon && (
        <HeroIcon
          icon={icon}
          noBaseStyle
          className={cnb(styles.iconStyle, iconClasses)}
          {...iProps}
        />
      )}
    </AsComponent>
  );
};
