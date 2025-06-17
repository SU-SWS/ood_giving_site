'use client';
import { type SbBlokData, storyblokEditable } from '@storyblok/react';
import {
  Popover, PopoverButton, PopoverPanel, Transition,
} from '@headlessui/react';
import { useWindowSize } from 'usehooks-ts';
import { CreateBloks } from '@/components/CreateBloks';
import { FlexBox } from '@/components/FlexBox';
import { HeroIcon } from '@/components/HeroIcon';
import { config } from '@/utilities/config';
import * as styles from './SbMegaMenu.styles';

export type SbMegaMenuProps = {
  blok: SbBlokData & {
    topLevelLinks?: SbBlokData[]; // Top level links and parent items for the panels
  };
};

export const SbMegaMenu = (props: SbMegaMenuProps) => {
  const windowSize = useWindowSize();

  if (windowSize.width >= config.breakpoints.lg) {
    return (
      <nav {...storyblokEditable(props.blok)} className="ood-mega-nav grow" aria-label="Main Menu">
        <FlexBox as="ul" wrap="wrap" className="ood-mega-nav__menu-lv1 list-unstyled gap-30 xl:gap-38">
          <CreateBloks blokSection={props.blok.topLevelLinks} />
        </FlexBox>
      </nav>
    );
  }
  return (
    <Popover as="nav" className="ood-mega-nav flex z-[200] lg:items-center" aria-label="Main Menu">
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
              {...storyblokEditable(props.blok)}
              className={styles.mobileTopMenu}
            >
              <CreateBloks blokSection={props.blok.topLevelLinks} />
            </PopoverPanel>
          </Transition>
        </>
      )}
    </Popover>
  );
};
