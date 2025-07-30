import { storyblokEditable, type SbBlokData } from '@storyblok/react/rsc';
import { type IconName } from '@fortawesome/fontawesome-svg-core';
import { IconCard } from '@/components/IconCard';
import { type SbLinkType } from '@/components/Storyblok/Storyblok.types';
import { type CardBgColorType } from '@/utilities/datasource';
import { type SbFontawesomeSelectorType } from '@/components/Storyblok/Storyblok.types';

/**
 * Note: The headingLevel option is deprecated because we no longer use HTML headings for a11y.
 */
type SbIconCardProps = {
  blok: SbBlokData & {
    // The input from the Storyblok plugin FontAwesome selector
    icon?: SbFontawesomeSelectorType;
    // The text field from Storyblok that allow user to use icons that are not supported by the FontAwesome selector
    extraIcon?: string;
    // Free solid or outline style icons
    iconStyle?: 'fas' | 'far';
    headline: string;
    link: SbLinkType;
    backgroundColor?: CardBgColorType;
    contentAlign?: 'left' | 'center' | 'right';
  };
}

export const SbIconCard = ({ blok }: SbIconCardProps) => {
  const {
    icon,
    extraIcon,
    iconStyle,
    headline,
    link,
    backgroundColor,
    contentAlign,
  } = blok;

  // Remove fa- from the icon name if it exists
  const formattedIcon = icon?.icon?.replace('fa-', '') || '';
  const finalIcon = extraIcon || formattedIcon;
  const iconType = iconStyle || icon?.type || 'far';

  return (
    <IconCard
      {...storyblokEditable(blok)}
      icon={finalIcon as IconName}
      iconStyle={iconType}
      headline={headline}
      link={link}
      backgroundColor={backgroundColor}
      contentAlign={contentAlign}
    />
  );
};
