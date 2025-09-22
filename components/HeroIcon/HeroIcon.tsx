import { cnb } from 'cnbuilder';
import * as styles from './HeroIcon.styles';

export type HeroIconProps = Omit<React.SVGProps<SVGSVGElement>, 'ref'> & {
  icon: styles.IconType;
  // Title for the SVG for accessibility
  title?: string;
  noBaseStyle?: boolean;
};

export const HeroIcon = ({
  icon,
  title,
  noBaseStyle,
  className,
  ...props
}: HeroIconProps) => {
  const Icon = styles.iconMap[icon];

  // Set default base style so icon has reasonable size if used out of the box
  // noBaseStyle boolean allows for user to not attach any base styles if needed
  const baseStyle = noBaseStyle ? '' : styles.iconBaseStyle[icon] || styles.iconBaseStyleDefault;
  const heroIconStyle = cnb('transition', baseStyle);

  return (
    <Icon
      title={title}
      role={!!title ? 'img' : null}
      // If a title for the SVG is provided, unhide the SVG from screen readers
      aria-hidden={!title}
      className={cnb(heroIconStyle, className)}
      {...props}
    />
  );
};
