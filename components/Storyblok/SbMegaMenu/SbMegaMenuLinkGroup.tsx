import { type SbBlokData, storyblokEditable } from '@storyblok/react/rsc';
import { CtaLink } from '@/components/Cta';
import { Heading } from '@/components/Typography';
import { getNumBloks } from '@/utilities/getNumBloks';
import { type SbOodMegaMenuNavItemProps } from '@/components/Storyblok/Storyblok.types';
import * as styles from './SbMegaMenu.styles';

export type SbMegaMenuLinkGroupProps = {
  blok: SbBlokData & {
    heading?: string;
    links?: SbOodMegaMenuNavItemProps[];
  };
};

export const SbMegaMenuLinkGroup = ({ blok }: SbMegaMenuLinkGroupProps) => {
  const { heading, links } = blok;

  return (
    <div {...storyblokEditable(blok)} className={styles.linkGroup}>
      {heading && (
        <Heading font="sans" weight="bold" uppercase tracking="widest" className={styles.linkGroupHeading}>
          {heading}
        </Heading>
      )}
      {!!getNumBloks(links) && (
        <ul className={styles.linkGroupList}>
          {links?.map(({ _uid, link, linkText }) => (
            <li key={_uid} className={styles.linkGroupItem}>
              <CtaLink
                sbLink={link}
                variant="mega-menu-link-lvl2"
                icon={link.linktype === 'story' ? 'su-link--no-icon' : 'su-link--external'}
              >
                {linkText}
              </CtaLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
