'use client';

import React, {
  createContext,
  useState,
  useEffect,
} from 'react';
import { type SearchConfig } from '@/utilities/data/getSearchConfigBlok';
import { usePathname } from 'next/navigation';

type SearchModalContextProps = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  searchConfig: SearchConfig;
};

/**
 * A context to manage the state of the search modal.
 */
export const SearchModalContext = createContext<SearchModalContextProps>({
  isOpen: false,
  open: () => null,
  close: () => null,
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
  const [isOpen, setIsOpen] = useState(false);

  // Close handler.
  const close = () => {
    setIsOpen(false);
  };

  // Open handler.
  const open = () => {
    setIsOpen(true);
  };

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
        searchConfig,
      }}
    >
      {children}
    </SearchModalContextProvider>
  );
}
