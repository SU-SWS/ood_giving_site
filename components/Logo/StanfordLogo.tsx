import { type HTMLAttributes, type ReactNode } from 'react';
import { cnb } from 'cnbuilder';
import * as styles from './StanfordLogo.styles';

type StanfordLogoProps = HTMLAttributes<HTMLElement> & {
  color?: styles.StanfordLogoColorType;
  type?: 'short' | 'full' | 'stacked';
  isLink?: boolean;
};

export const StanfordLogo = ({
  className,
  color = 'black',
  type,
  isLink,
  ...rest
}: StanfordLogoProps) => {
  let logoText: string | ReactNode;

  switch (type) {
    case 'full':
      logoText = 'Stanford University';
      break;

    case 'stacked':
      logoText = (
        <>
          Stanford
          <br />
          University
        </>
      );
      break;

    case 'short':
    default:
      logoText = 'Stanford';
      break;
  }

  // Render logo as link if isLink is true
  if (isLink) {
    return (
      <a
        {...rest}
        href="https://www.stanford.edu"
        className={cnb('logo', color ? styles.stanfordLogoColors[color] : '', className)}
      >
        {logoText}
      </a>
    );
  }

  return (
    <div {...rest} className={cnb('logo', color ? styles.stanfordLogoColors[color] : '', className)}>
      {logoText}
    </div>
  );
};
