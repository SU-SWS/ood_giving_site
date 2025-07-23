'use client';
import { type SbBlokData, storyblokEditable } from '@storyblok/react/rsc';
import {
  Popover, PopoverButton, PopoverPanel, Transition,
} from '@headlessui/react';
import { CreateBloks } from '@/components/CreateBloks';
import { Heading } from '@/components/Typography';
import { HeroIcon } from '@/components/HeroIcon';
import { getNumBloks } from '@/utilities/getNumBloks';
import * as styles from './SbContentMenu.styles';

export type SbContentMenuProps = {
  blok: SbBlokData & {
    menuTitle?: string;
    relatedMenuTitle?: string;
    // Either a content menu parent item or a content nav item can be added to the below two links fields
    menuLinks?: SbBlokData[];
    relatedMenuLinks?: SbBlokData[];
  };
  // Slug is passed to children to check for active links
  slug?: string;
};

type LinkGroupProps = {
  title?: string;
  children?: React.ReactNode;
};

const LinkGroup = ({
  title,
  children,
}: LinkGroupProps) => (
  <div className={styles.linkGroup}>
    {title && (
      <Heading font="sans" uppercase tracking="widest" className={styles.menuTitle}>
        {title}
      </Heading>
    )}
    <ul className={styles.menu}>{children}</ul>
  </div>
);


type MenuContentProps = {
  title?: string;
  relatedTitle?: string;
  links?: SbBlokData[];
  relatedLinks?: SbBlokData[];
  slug?: string;
}

const MenuContent = ({
  title,
  relatedTitle,
  links,
  relatedLinks,
  slug,
}: MenuContentProps) => (
  <>
    <LinkGroup title={title}>
      <CreateBloks blokSection={links} slug={slug} />
    </LinkGroup>
    {!!getNumBloks(relatedLinks) && (
      <LinkGroup title={relatedTitle}>
        <CreateBloks blokSection={relatedLinks} slug={slug} />
      </LinkGroup>
    )}
  </>
);

export const SbContentMenu = ({ blok, slug }: SbContentMenuProps) => {
  const {
    menuTitle,
    relatedMenuTitle,
    menuLinks,
    relatedMenuLinks,
  } = blok;

  return (
    <>
      {/* Desktop content menu in the sidebar */}
      <nav aria-label="Section Content Menu" className={styles.root} {...storyblokEditable(blok)}>
        <MenuContent
          title={menuTitle}
          links={menuLinks}
          relatedTitle={relatedMenuTitle}
          relatedLinks={relatedMenuLinks}
          slug={slug}
        />
      </nav>
      {/* Mobile collapsible content menu */}
      <Popover
        as="nav"
        className={styles.mobileRoot}
        aria-label="Section Content Menu"
        {...storyblokEditable(blok)}
      >
        {({ open }) => (
          <>
            <PopoverButton className={styles.mobileButton}>
              {open ? 'Close' : 'Section Menu'}
              <HeroIcon
                icon={open ? 'close' : 'menu'}
                noBaseStyle
                className={styles.mobileButtonIcon}
              />
            </PopoverButton>
            <Transition
              enter="duration-300 ease-out"
              enterFrom="opacity-0 scale-y-95"
              enterTo="opacity-100 scale-y-100"
              leave="duration-200 ease-out"
              leaveFrom="opacity-100 scale-y-100"
              leaveTo="opacity-0 scale-y-95"
            >
              <PopoverPanel className={styles.mobilePanel}>
                <MenuContent
                  title={menuTitle}
                  links={menuLinks}
                  relatedTitle={relatedMenuTitle}
                  relatedLinks={relatedMenuLinks}
                  slug={slug}
                />
              </PopoverPanel>
            </Transition>
          </>
        )}
      </Popover>
    </>
  );
};
