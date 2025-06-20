'use client';
import { type SbBlokData, storyblokEditable } from '@storyblok/react/rsc';
import { useWindowSize } from 'usehooks-ts';
import {
  Popover, PopoverButton, PopoverPanel, Transition,
} from '@headlessui/react';
import { CreateBloks } from '@/components/CreateBloks';
import { Heading } from '@/components/Typography';
import { HeroIcon } from '@/components/HeroIcon';
import { config } from '@/utilities/config';
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
  slug?: string;
};

type MenuContentProps = {
  title?: string;
  relatedTitle?: string;
  links?: SbBlokData[];
  relatedLinks?: SbBlokData[];
}

const MenuContent = ({
  title,
  relatedTitle,
  links,
  relatedLinks,
}: MenuContentProps) => (
  <>
    <div className={`ood-content-nav__menu-group text-white`}>
      {title && (
        <Heading font="sans" uppercase tracking="widest" className="mt-26 lg:mt-0 text-18 ml-16 lg:ml-0">
          {title}
        </Heading>
      )}
      <ul className="secondary-nav__menu secondary-nav__menu-lv1 ood-content-nav__menu ood-content-nav__menu-lv1">
        <CreateBloks blokSection={links} />
      </ul>
    </div>
    {!!getNumBloks(relatedLinks) && (
      <div className={`ood-content-nav__menu-group`}>
        {relatedTitle && (
          <Heading font="sans" uppercase tracking="widest" className="mt-26 lg:mt-0 text-18 ml-16 lg:ml-0">
            {relatedTitle}
          </Heading>
        )}
        <ul className="secondary-nav__menu secondary-nav__menu-lv1 ood-content-nav__menu ood-content-nav__menu-lv1 ood-content-nav__menu-related">
          <CreateBloks blokSection={relatedLinks} />
        </ul>
      </div>
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

  const windowSize = useWindowSize();

  // Desktop version of the content menu is always expanded
  if (windowSize.width >= config.breakpoints.lg) {
    return (
      <nav
        className="secondary-nav ood-content-nav"
        aria-label="Section Content Menu"
        {...storyblokEditable(blok)}
      >
        <div className={`ood-content-nav__menus`}>
          <MenuContent
            title={menuTitle}
            links={menuLinks}
            relatedTitle={relatedMenuTitle}
            relatedLinks={relatedMenuLinks}
          />
        </div>
      </nav>
    );
  }
  // Mobile/tablet version of the content menu with toggle button and collapsable with aria labels
  return (
    <Popover
      as="nav"
      className="secondary-nav ood-content-nav"
      aria-label="Section Content Menu"
      {...storyblokEditable(blok)}
    >
      {({ open }) => (
        <>
          <PopoverButton
            className={styles.mobileButton}
          >
            {open ? 'Close' : 'Section Menu'}{' '}
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
            <PopoverPanel className={`ood-content-nav__menus`}>
              <MenuContent
                title={menuTitle}
                links={menuLinks}
                relatedTitle={relatedMenuTitle}
                relatedLinks={relatedMenuLinks}
              />
            </PopoverPanel>
          </Transition>
        </>
      )}
    </Popover>
  );
};
