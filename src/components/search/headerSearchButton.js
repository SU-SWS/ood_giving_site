import React, { useContext } from "react";
import { SearchOverlayOpenContext } from "../../context/searchOverlayStatusProvider";

const HeaderSearchButton = () => {
  const { toggleSearchOverlay } = useContext(SearchOverlayOpenContext);

  return (
    <button className="ood-header__search-button" onClick={toggleSearchOverlay}>
      <span className="su-sr-only-element">Search this site</span>
      <i
        className="ood-header__search-button-icon fas fa-search fa-flip-horizontal"
        aria-hidden="true"
      />
    </button>
  );
};

export default HeaderSearchButton;
