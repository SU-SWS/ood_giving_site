'use client';

import React, {
  createContext,
  useState,
  useRef,
  useEffect,
} from 'react';
import { useEscape } from '@/hooks/useEscape';
import { useDisplay } from '@/hooks/useDisplay';
import { type SearchConfig } from '@/utilities/data/getSearchConfigBlok';
import { usePathname } from 'next/navigation';

type SearchModalContextProps = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  desktopButtonRef: React.RefObject<HTMLButtonElement>;
  mobileButtonRef: React.RefObject<HTMLButtonElement>;
  modalSearchInputRef: React.RefObject<HTMLInputElement>;
  searchInputRef: React.RefObject<HTMLInputElement>;
  searchConfig: SearchConfig;
};

/**
 * A context to manage the state of the search modal.
 */
export const SearchModalContext = createContext<SearchModalContextProps>({
  isOpen: false,
  open: () => null,
  close: () => null,
  desktopButtonRef: null,
  mobileButtonRef: null,
  modalSearchInputRef: null,
  searchInputRef: null,
  searchConfig: null,
});
export const SearchModalContextProvider = SearchModalContext.Provider;

type SearchModalProviderProps = {
  children: React.ReactElement;
  searchConfig: SearchConfig;
};

/**
 * A provider to manage the state of the search modal.
 */
export function SearchModalProvider({
  children,
  searchConfig,
}: SearchModalProviderProps) {
  const pathname = usePathname();
  const { showDesktop, showMobile } = useDisplay();
  const [isOpen, setIsOpen] = useState(false);
  const desktopButtonRef = useRef<HTMLButtonElement>(null);
  const mobileButtonRef = useRef<HTMLButtonElement>(null);
  const modalSearchInputRef = useRef<HTMLInputElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Close handler.
  const close = () => {
    setIsOpen(false);
    if (showDesktop) desktopButtonRef.current.focus();
    if (showMobile) mobileButtonRef.current.focus();
  };

  // Open handler.
  const open = () => {
    // Don't open the modal if the user is already on the search page.
    // Instead focus on the search input.
    if (
      window
      && window.location
      && window.location.pathname.startsWith('/search')
    ) {
      searchInputRef.current.focus();
      searchInputRef.current.scrollIntoView();
      return;
    }

    setIsOpen(true);
  };

  // Close the modal when the escape key is pressed.
  useEscape(() => {
    if (isOpen) close();
  });

  // Close the modal on route change
  useEffect(() => {
    if (pathname) {
      setIsOpen(false);
    }
  }, [pathname]);

  // Provider wrapper.
  return (
    <SearchModalContextProvider
      value={{
        isOpen,
        open,
        close,
        desktopButtonRef,
        mobileButtonRef,
        modalSearchInputRef,
        searchInputRef,
        searchConfig,
      }}
    >
      {children}
    </SearchModalContextProvider>
  );
}
