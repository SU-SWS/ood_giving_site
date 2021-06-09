import React, { useContext } from "react";
import { SearchOverlayOpenContext } from "../../context/searchOverlayStatusProvider";

const HeaderSearchButton = () => {
  const { toggleSearchOverlay } = useContext(SearchOverlayOpenContext);

  return (
    <button className="ood-header__search-button" onClick={toggleSearchOverlay}>
      Search
      <span className="su-sr-only-element"> this site</span>
      <i
        className="ood-header__search-button-icon fa-flip-horizontal"
        aria-hidden="true"
      />
    </button>
  );
};

export default HeaderSearchButton;
