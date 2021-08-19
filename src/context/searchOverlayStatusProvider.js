import React, { useEffect, useState } from "react";
import SearchOverlay from "../components/search/searchOverlay";

export const SearchOverlayOpenContext = React.createContext(null);

const SearchOverlayOpenContextProvider = props => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const searchOverlay = document.querySelector(".search-overlay");
      let scrollbarWidth =
        searchOverlay.offsetWidth - searchOverlay.clientWidth + "px";

      document.getElementsByTagName("html")[0].style.overflowY = "hidden";
      document.getElementsByTagName("body")[0].style.position = "fixed";
      document.getElementsByTagName(
        "body"
      )[0].style.paddingRight = scrollbarWidth;
    } else {
      document.getElementsByTagName("body")[0].style.position = "relative";
      document.getElementsByTagName("html")[0].style.overflowY = "scroll";
      document.getElementsByTagName("body")[0].style.paddingRight = "0";
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
      {props.children}
    </SearchOverlayOpenContext.Provider>
  );
};

export default ({ element }) => (
  <SearchOverlayOpenContextProvider>
    {element}
    <SearchOverlay />
  </SearchOverlayOpenContextProvider>
);
