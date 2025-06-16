import { type SbBlokData, storyblokEditable } from '@storyblok/react/rsc';
import { CreateBloks } from '@/components/CreateBloks';
import { CtaLink } from '@/components/Cta';
import { FlexBox } from '@/components/FlexBox';
import { type SbNavItemProps } from './Storyblok.types';

export type SbSubMenuProps = {
  blok: SbBlokData & {
    menuLinkItems?: SbNavItemProps[];
    ctaLink?: SbBlokData[];
  };
};

const styles = {
  root: 'md:cc gap-24 bg-digital-red-dark md:bg-white [&_a]:ml-0 [&_.cta-button]:text-14 [&_.cta-button]:sm:text-16 [&_.cta-button]:md:text-20 [&_.cta-button]:leading-[4rem] [&_.cta-button]:md:leading-tight [&_.cta-button]:py-0 [&_.cta-button]:px-20 [&_.cta-button]:md:px-26 [&_.cta-button]:md:pt-10 [&_.cta-button]:md:pb-13',
  linkList: 'gap-24 list-unstyled',
  listItem: 'mb-0',
};

export const SbSubMenu = (props: SbSubMenuProps) => {
  const { menuLinkItems, ctaLink } = props.blok;

  return (
    <FlexBox
      {...storyblokEditable(props.blok)}
      as="nav"
      justifyContent="end"
      className={styles.root}
      aria-label="Sub Menu"
    >
      <FlexBox as="ul" className={styles.linkList} alignItems="center">
        {menuLinkItems?.map((navItem) => (
          <li key={navItem._uid} className={styles.listItem}>
            <CtaLink sbLink={navItem.link} variant="sub-menu" align="right" icon={navItem.linkClass}>
              {navItem.linkTextLabel}
            </CtaLink>
          </li>
        ))}
      </FlexBox>
      <CreateBloks blokSection={ctaLink} />
    </FlexBox>
  );
};
