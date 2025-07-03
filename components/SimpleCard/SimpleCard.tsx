import { cnb } from 'cnbuilder';
import { cardBgColors, type CardBgColorType } from '@/utilities/datasource';

/**
 * Basic card component with background color options.
 * Used as or Basic, Tile, Story Cards and Poster components.
 */
export type SimpleCardProps = React.HTMLAttributes<HTMLDivElement> & {
  bgColor?: CardBgColorType;
};

const styles = {
  root: 'relative shadow-md border border-black-10',
};

export const SimpleCard = ({
  bgColor = 'white',
  children,
  className,
  ...props
}: SimpleCardProps) => {

  return (
    <article className={cnb(styles.root, cardBgColors[bgColor], className)} {...props}>
      {children}
    </article>
  );
};
