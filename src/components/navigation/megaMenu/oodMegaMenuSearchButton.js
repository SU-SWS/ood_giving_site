import React, { useContext } from "react"
import { SearchOverlayOpenContext } from "../../../context/searchOverlayStatusProvider"

const OodMegaMenuSearchButton = () => {
  const { toggleSearchOverlay } = useContext(SearchOverlayOpenContext)

  return (
    <button
      className="ood-mega-nav__search-button"
      onClick={toggleSearchOverlay}
      title="Search site"
    >
      <span
        className="ood-mega-nav__search-button-icon"
        aria-label="Search icon"
      />
    </button>
  )
}

export default OodMegaMenuSearchButton
