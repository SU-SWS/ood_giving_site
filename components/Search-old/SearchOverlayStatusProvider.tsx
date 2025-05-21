import React, { useEffect, useState } from 'react';
import { SearchOverlay } from './SearchOverlay';

export const SearchOverlayOpenContext = React.createContext(null);

type SearchOverlayOpenContextProviderProps = {
  children?: React.ReactNode;
};

const SearchOverlayOpenContextProvider = ({ children }: SearchOverlayOpenContextProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const searchOverlay = document.querySelector<HTMLElement>('.search-overlay');
      const scrollbarWidth = searchOverlay.offsetWidth - searchOverlay.clientWidth + 'px';

      document.getElementsByTagName('html')[0].style.overflowY = 'hidden';
      document.getElementsByTagName('body')[0].style.position = 'fixed';
      document.getElementsByTagName('body')[0].style.paddingRight = scrollbarWidth;
    } else {
      document.getElementsByTagName('body')[0].style.position = 'relative';
      document.getElementsByTagName('html')[0].style.overflowY = 'scroll';
      document.getElementsByTagName('body')[0].style.paddingRight = '0';
    }
  }, [isOpen]);

  return (
    <SearchOverlayOpenContext.Provider
      value={{
        isOpen,
        toggleSearchOverlay: () => setIsOpen(!isOpen),
        openSearchOverlay: () => setIsOpen(true),
        closeSearchOverlay: () => setIsOpen(false),
      }}
    >
      {children}
    </SearchOverlayOpenContext.Provider>
  );
};

type SearchOverlayStatusProviderProps = {
  children?: React.ReactNode;
};

export const SearchOverlayStatusProvider = ({ children }: SearchOverlayStatusProviderProps) => (
  <SearchOverlayOpenContextProvider>
    {children}
    <SearchOverlay />
  </SearchOverlayOpenContextProvider>
);
