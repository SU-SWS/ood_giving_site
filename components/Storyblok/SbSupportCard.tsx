import { storyblokEditable } from '@storyblok/react/rsc';
import { type IconName } from '@fortawesome/fontawesome-svg-core';
import { SupportCard } from '@/components/SupportCard';
import { type SbLinkType, type SbFontawesomeSelectorType } from '@/components/Storyblok/Storyblok.types';
import { type AllCardBgColorType } from '@/utilities/datasource';
import { type AreasToSupportType } from '@/components/Storyblok/SbSupportPage';

export type SbSupportCardBlokProps = {
  _uid?: string;
  taxonomy: AreasToSupportType[];
  headline: string;
  link: SbLinkType;
  // The input from the Storyblok plugin FontAwesome selector
  icon?: SbFontawesomeSelectorType;
  // The text field from Storyblok that allow user to use icons that are not supported by the FontAwesome selector
  extraIcon?: string;
  // Free solid or outline style icons
  iconStyle?: 'fas' | 'far';
  backgroundColor?: AllCardBgColorType;
};

type SbSupportCardProps = {
  blok: SbSupportCardBlokProps;
};

export const SbSupportCard = ({ blok }: SbSupportCardProps) => {
  const {
    taxonomy,
    headline,
    link,
    icon,
    extraIcon,
    iconStyle,
    backgroundColor,
  } = blok;

  // Remove fa- from the icon name if it exists
  const formattedIcon = icon?.icon?.replace('fa-', '') || '';
  const finalIcon = extraIcon || formattedIcon;
  const iconType = iconStyle || icon?.type || 'far';

  return (
    <SupportCard
      {...storyblokEditable(blok)}
      taxonomy={taxonomy}
      headline={headline}
      link={link}
      icon={finalIcon as IconName}
      iconStyle={iconType}
      bgColor={backgroundColor || 'lagunita'}
    />
  );
};
