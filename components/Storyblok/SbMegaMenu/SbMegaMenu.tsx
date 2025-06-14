'use client';
import { type SbBlokData, storyblokEditable } from '@storyblok/react';
import {
  Popover, PopoverButton, PopoverPanel, Transition,
} from '@headlessui/react';
import { CreateBloks } from '@/components/CreateBloks';
import { FlexBox } from '@/components/FlexBox';
import { config } from '@/utilities/config';
import { useWindowSize } from 'usehooks-ts';

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
            className="ood-mega-nav__toggle mr-none ml-auto"
            aria-label={open ? 'Close Menu' : 'Open Menu'}
          >
            <i
              aria-hidden="true"
              className={`fas fa-${open ? 'times' : 'bars'}`}
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
              className="ood-mega-nav__menu-lv1 list-unstyled"
              // aria-hidden={!menuOpened}
            >
              <CreateBloks blokSection={props.blok.topLevelLinks} />
            </PopoverPanel>
          </Transition>
        </>
      )}
    </Popover>
  );
};
