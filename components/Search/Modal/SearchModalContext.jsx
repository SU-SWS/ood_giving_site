import React, { createContext, useState, useRef } from 'react';
import scrollTo from 'gatsby-plugin-smoothscroll';
import useEscape from '../../../hooks/useEscape';
import useDisplay from '../../../hooks/useDisplay';

/**
 * A context to manage the state of the search modal.
 */
const SearchModalContext = createContext({});
export const SearchModalContextProvider = SearchModalContext.Provider;
export default SearchModalContext;

/**
 * A provider to manage the state of the search modal.
 * @param {Object} props
 * @param {React.ReactNode} props.children
 */
export function SearchModalProvider({ children }) {
  const { showDesktop, showMobile } = useDisplay();
  const [isOpen, setIsOpen] = useState(false);
  const desktopButtonRef = useRef();
  const mobileButtonRef = useRef();
  const modalSearchInputRef = useRef();
  const searchInputRef = useRef();

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
      scrollTo(`#${searchInputRef.current.id}`);
      return;
    }

    setIsOpen(true);
  };

  // Close the modal when the escape key is pressed.
  useEscape(() => {
    if (isOpen) close();
  });

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
      }}
    >
      {children}
    </SearchModalContextProvider>
  );
}
