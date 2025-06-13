import { cnb } from 'cnbuilder';
import { HeroIcon, type IconType } from '@/components/HeroIcon';
import { SrOnlyText } from '@/components/Typography';
import * as styles from './Cta.styles';
import * as types from './Cta.types';

type CtaContentProps = Omit<types.CtaCommonProps, 'buttonSize' | 'textColor'>;

export const CtaContent = ({
  icon = 'su-link--action',
  iconProps,
  srText,
  children,
}: CtaContentProps) => {
  const heroIcon = icon ? styles.ctaIcons[icon] as IconType : undefined;
  const iconMarginLeft = children && icon ? styles.iconLeftMargin[icon] || styles.iconLeftMarginDefault : '';
  const { className: iconClasses, ...iProps } = iconProps || {};
  const iconAnimate = icon ? styles.iconAnimations[icon] : '';

  return (
    <>
      {children}
      {/* Use this whitespace-nowrap trick so icon won't get pushed to the next line on its own */}
      {heroIcon && (
        <span className="whitespace-nowrap">
          &#65279;
          <HeroIcon
            icon={heroIcon}
            className={cnb(styles.icon, iconAnimate, iconMarginLeft, iconClasses)}
            {...iProps}
          />
        </span>
      )}
      {srText && <SrOnlyText>{srText}</SrOnlyText>}
    </>
  );
};
