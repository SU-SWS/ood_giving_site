import { library, type IconName } from '@fortawesome/fontawesome-svg-core';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon, type FontAwesomeIconProps } from '@fortawesome/react-fontawesome';

/**
 * We use FontAwesome icons in Icon Cards, Support Card and other components.
 * See setup instructions and usage:
 * https://docs.fontawesome.com/web/use-with/react/add-icons
 * https://docs.fontawesome.com/web/use-with/react/style
 */
export type FAIconProps = Omit<FontAwesomeIconProps, 'icon'> & {
  icon: IconName;
  // For this project we only use the free outline "far" or solid "fas" icons
  iconStyle?: 'far' | 'fas';
}

export const FAIcon = ({
  icon,
  iconStyle,
  /**
   * Optional svg title for accessibility. Add title if icon is not decorative.
   * Icon is aria-hidden unless a title is provided.
   */
  title,
  ...props
}: FAIconProps) => {
  if (!icon) {
    return null;
  }

  // Add both free solid and regular FA icons to the library so we can use any of them
  library.add(far, fas);

  const faStyle = iconStyle || 'far';

  return (
    <FontAwesomeIcon {...props} title={title} icon={[faStyle, icon]} />
  );
};
