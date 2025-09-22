'use client';
import { type SbBlokData, storyblokEditable } from '@storyblok/react/rsc';
import {
  Popover, PopoverButton, PopoverPanel, Transition,
} from '@headlessui/react';
import { CreateBloks } from '@/components/CreateBloks';
import { FlexBox } from '@/components/FlexBox';
import { HeroIcon } from '@/components/HeroIcon';
import { getNumBloks } from '@/utilities/getNumBloks';
import * as styles from './SbMegaMenu.styles';

export type SbMegaMenuProps = {
  blok: SbBlokData & {
    topLevelLinks?: SbBlokData[]; // Top level links and parent items for the panels
  };
  // Slug is passed to children to check for active links
  slug?: string;
};

export const SbMegaMenu = ({ blok, slug }: SbMegaMenuProps) => {
  const { topLevelLinks } = blok;

  if (!getNumBloks(topLevelLinks)) {
    return null;
  }

  return (
    <>
      {/* Desktop mega menu */}
      <nav {...storyblokEditable(blok)} className={styles.root} aria-label="Main Menu">
        <FlexBox as="ul" wrap="wrap" className={styles.wrapper}>
          <CreateBloks blokSection={topLevelLinks} slug={slug} />
        </FlexBox>
      </nav>
      {/* Mobile collapsible mega menu */}
      <Popover as="nav" className={styles.mobileRoot} aria-label="Main Menu">
        {({ open }) => (
          <>
            <PopoverButton
              className={styles.mobileButton}
              aria-label={open ? 'Close Menu' : 'Open Menu'}
            >
              <HeroIcon
                icon={open ? 'close' : 'menu'}
                noBaseStyle
                className={styles.mobileButtonIcon}
              />
              {open ? 'Close' : 'Menu'}
            </PopoverButton>
            <Transition
              enter="duration-300 ease-out"
              enterFrom="opacity-0 scale-y-95"
              enterTo="opacity-100 scale-y-100"
              leave="duration-200 ease-out"
              leaveFrom="opacity-100 scale-y-100"
              leaveTo="opacity-0 scale-y-95"
            >
              <PopoverPanel
                as="ul"
                {...storyblokEditable(blok)}
                className={styles.mobileTopMenu}
              >
                <div className={styles.innerShadow} aria-hidden="true" />
                <CreateBloks blokSection={topLevelLinks} slug={slug} />
              </PopoverPanel>
            </Transition>
          </>
        )}
      </Popover>
    </>
  );
};
