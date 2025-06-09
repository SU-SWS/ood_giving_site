'use client';
import { useRef, useState } from 'react';
import { type SbBlokData, storyblokEditable } from '@storyblok/react';
import { CreateBloks } from '@/components/CreateBloks';
import { useEscape } from '@/hooks/useEscape';
import { useOnClickOutside } from 'usehooks-ts';
import { config } from '@/utilities/config';
import { useWindowSize } from 'usehooks-ts';

export type SbMegaMenuProps = {
  blok: SbBlokData & {
    topLevelLinks?: SbBlokData[];
  };
};

export const SbMegaMenu = (props: SbMegaMenuProps) => {
  const windowSize = useWindowSize();
  const [menuOpened, setMenuOpened] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const isExpanded = (x: HTMLElement) => x.getAttribute('aria-expanded') === 'true';

  const toggleMenu = () => {
    setMenuOpened(!menuOpened);
  };

  // Close menu if escape key is pressed and return focus to the menu button
  useEscape(() => {
    if (burgerRef.current && isExpanded(burgerRef.current)) {
      setMenuOpened(false);
      burgerRef.current.focus();
    }
  });

  useOnClickOutside(ref, () => setMenuOpened(false));

  if (windowSize.width >= config.breakpoints.lg) {
    return (
      <nav {...storyblokEditable(props.blok)} className="ood-mega-nav" aria-label="Main Menu">
        <ul className="ood-mega-nav__menu-lv1 list-none">
          <CreateBloks blokSection={props.blok.topLevelLinks} />
        </ul>
      </nav>
    );
  }
  return (
    <nav {...storyblokEditable(props.blok)} className="ood-mega-nav flex z-[200] lg:items-center" aria-label="Main Menu" ref={ref}>
      <button
        type="button"
        className="ood-mega-nav__toggle mr-none ml-auto"
        aria-label={menuOpened ? 'Close Menu' : 'Open Menu'}
        aria-expanded={menuOpened}
        onClick={toggleMenu}
        ref={burgerRef}
      >
        <i
          aria-hidden="true"
          className={`fas fa-${menuOpened ? 'times' : 'bars'}`}
        />
        {menuOpened ? 'Close' : 'Menu'}
      </button>
      <ul
        className="ood-mega-nav__menu-lv1 list-none"
        aria-hidden={!menuOpened}
      >
        <CreateBloks blokSection={props.blok.topLevelLinks} />
      </ul>
    </nav>
  );
};
