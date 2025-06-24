import { type SbBlokData, storyblokEditable } from '@storyblok/react/rsc';
import { CtaLink } from '@/components/Cta/CtaLink';
import { SbLinkType } from '@/components/Storyblok/Storyblok.types';
import { isActiveLink } from '@/utilities/isActiveLink';
import * as styles from './SbContentMenu.styles';

export type SbContentNavItemProps = {
  blok: SbBlokData & {
    link?: SbLinkType;
    linkText?: string;
  };
  slug?: string;
};

export const SbContentNavItem = ({ blok, slug }: SbContentNavItemProps) => {
  const { link, linkText } = blok;

  if (!link.cached_url || !linkText) {
    return null;
  }

  const isActivePage = isActiveLink(slug, link.cached_url);

  return (
    <li className={styles.navItem} {...storyblokEditable(blok)}>
      <CtaLink
        sbLink={link}
        variant="content-menu"
        aria-current={isActivePage ? 'page' : undefined}
      >
        {linkText}
      </CtaLink>
    </li>
  );
};
