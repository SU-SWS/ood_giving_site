import { cnb } from 'cnbuilder';
import { allCardBgColors, type AllCardBgColorType } from '@/utilities/datasource';

/**
 * Basic card component with background color options.
 * Used as or Basic, Tile, Story Cards and Poster components.
 */
export type SimpleCardProps = React.HTMLAttributes<HTMLDivElement> & {
  bgColor?: AllCardBgColorType;
  hasLink?: boolean; // If true, the card has hover/focus styles
};

const style = (isLink: boolean, isDarkBg: boolean) => (cnb(
  'relative break-words shadow-md border border-black-10 transition-shadow',
  isLink && 'focus-within:shadow-lg hover:shadow-lg transition-shadow',
  // Add a dark overlay on hocus to darken the background color it's not a white or fog-light card
  (isLink && isDarkBg) && 'before:absolute before:z-0 before:inset-0 hover:before:bg-black-true/40 focus-within:before:bg-black-true/40 before:transition-colors',
));

export const SimpleCard = ({
  bgColor = 'white',
  hasLink,
  children,
  className,
  ...props
}: SimpleCardProps) => {
  const isDarkBg = bgColor !== 'white' && bgColor !== 'fog-light';

  return (
    <article className={cnb(style(hasLink, isDarkBg), allCardBgColors[bgColor], className)} {...props}>
      {children}
    </article>
  );
};
