import { cnb } from 'cnbuilder';
import { marginTops, marginBottoms, type MarginType } from '@/utilities/datasource';
import { HeroIcon, type IconType, type HeroIconProps } from '@/components/HeroIcon';
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
  tracking?: types.FontTrackingType;
  italic?: boolean;
  srOnly?: boolean;
  uppercase?: boolean;
  mt?: MarginType;
  mb?: MarginType;
  icon?: IconType;
  iconProps?: Omit<HeroIconProps, 'icon'>;
  className?: string;
  children?: React.ReactNode;
};

// The TimeHTMLAttributes<HTMLElement> is for the dateTime attribute when using as="time"
export type TextProps = TypographyProps & React.HTMLAttributes<HTMLElement> & React.TimeHTMLAttributes<HTMLElement>;

export const Text = ({
  as: AsComponent = 'div',
  font,
  size,
  weight,
  align,
  color = 'default',
  variant,
  leading,
  tracking,
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
          tracking && styles.fontTrackings[tracking],
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
      {/* Use this whitespace-nowrap trick so icon won't get pushed to the next line on its own */}
      {icon && (
        <span className="whitespace-nowrap">
          &#65279;
          <HeroIcon
            {...iProps}
            icon={icon}
            className={cnb(iconClasses, styles.icon)}
          />
        </span>
      )}
    </AsComponent>
  );
};
