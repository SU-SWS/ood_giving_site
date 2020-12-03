import React, { useState } from 'react';
export const searchOverlayOpenContext = React.createContext();
const SearchOverlayOpenContextProvider = props => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <searchOverlayOpenContext.Provider value={{
      isOpen,
      toggleSearchOverlay: () => setIsOpen(!isOpen)
    }}>
      {props.children}
    </searchOverlayOpenContext.Provider>
  )
};
export default ({ element }) => (
  <SearchOverlayOpenContextProvider>
    {element}
  </SearchOverlayOpenContextProvider>
);