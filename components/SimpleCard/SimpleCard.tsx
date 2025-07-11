import { cnb } from 'cnbuilder';
import { allCardBgColors, type AllCardBgColorType } from '@/utilities/datasource';

/**
 * Basic card component with background color options.
 * Used as or Basic, Tile, Story Cards and Poster components.
 */
export type SimpleCardProps = React.HTMLAttributes<HTMLDivElement> & {
  bgColor?: AllCardBgColorType;
  isFeatured?: boolean;
  hasLink?: boolean; // If true, the card has hover/focus styles
};

const style = (isFeatured: boolean, isLink: boolean) => (cnb(
  'relative shadow-md border border-black-10 transition-shadow',
  !isFeatured && 'w-4/5 sm:w-3/4 md:w-full mx-auto',
  isLink && 'focus-within:shadow-lg hover:shadow-lg',
));

export const SimpleCard = ({
  bgColor = 'white',
  isFeatured,
  hasLink,
  children,
  className,
  ...props
}: SimpleCardProps) => {

  return (
    <article className={cnb(style(isFeatured, hasLink), allCardBgColors[bgColor], className)} {...props}>
      {children}
    </article>
  );
};
