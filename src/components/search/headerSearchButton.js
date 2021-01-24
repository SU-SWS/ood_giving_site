import React, { useContext } from "react";
import { SearchOverlayOpenContext } from "../../context/searchOverlayStatusProvider";

const HeaderSearchButton = () => {
  const { toggleSearchOverlay } = useContext(SearchOverlayOpenContext);

  return (
    <button className="ood-header__search-button" onClick={toggleSearchOverlay}>
      <span className="su-sr-only-element">Search this site</span>
      <span className="ood-header__search-button-icon" aria-hidden="true" />
    </button>
  );
};

export default HeaderSearchButton;
