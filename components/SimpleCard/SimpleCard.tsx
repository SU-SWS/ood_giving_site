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

const style = (isLink: boolean) => (cnb(
  'relative break-words shadow-md border border-black-10 transition-shadow',
  isLink && 'focus-within:shadow-lg hover:shadow-lg',
));

export const SimpleCard = ({
  bgColor = 'white',
  hasLink,
  children,
  className,
  ...props
}: SimpleCardProps) => {

  return (
    <article className={cnb(style(hasLink), allCardBgColors[bgColor], className)} {...props}>
      {children}
    </article>
  );
};
