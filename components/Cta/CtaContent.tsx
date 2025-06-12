// import { cnb } from 'cnbuilder';
import { FlexBox } from '../FlexBox';
// import { HeroIcon } from '../HeroIcon';
import { SrOnlyText } from '../Typography';
import * as types from './Cta.types';

type CtaContentProps = Omit<types.CtaCommonProps, 'buttonSize' | 'textColor'>;

export const CtaContent = ({
  buttonStyle,
  icon,
  iconProps,
  srText,
  children,
}: CtaContentProps) => {
  // const heroicon = icon || styles.ctaIconMap[variant];
  // const iconAnimate = animate ? styles.iconAnimation[animate] : '';

  // const iconMarginLeft = iconPosition === 'right' && children && heroicon
  //   ? styles.iconLeftMargin[heroicon] || styles.iconLeftMarginDefault
  //   : '';
  // const iconStyle = styles.iconStyles[variant];
  const { className: iconClasses, ...iProps } = iconProps || {};

  return (
    <FlexBox as="span" alignItems="center">
      {/* Use this whitespace-nowrap trick so icon won't get pushed to the next line on its own */}
      {/* {heroicon && (
        <span className="whitespace-nowrap">
          &#65279;
          <HeroIcon
            icon={heroicon}
            className={cnb(styles.icon, iconStyle, iconAnimate, iconMarginLeft, iconClasses)}
            {...iProps}
          />
        </span>
      )} */}
      {children}
      {srText && <SrOnlyText>{srText}</SrOnlyText>}
    </FlexBox>
  );
};
