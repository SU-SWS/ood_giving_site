import { library, type IconName } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon, type FontAwesomeIconProps } from '@fortawesome/react-fontawesome';

export type FAIconProps = Omit<FontAwesomeIconProps, 'icon'> & {
  icon: IconName;
  // For this project we only use the free outline "far" or solid "fas" icons
  iconStyle?: 'far' | 'fas';
  // Optional title for accessibility. Add title if icon is not decorative only.
  title?: string;
}

export const FAIcon = ({
  icon,
  iconStyle,
  title,
  ...props
}: FAIconProps) => {
  if (!icon) {
    return null;
  }

  // Add both free solid and regular FA icons to the library so we can use any of them
  library.add(fas, far);

  const faStyle = iconStyle || 'far';

  return (
    <FontAwesomeIcon {...props} title={title} icon={[faStyle, icon]} />
  );
};
