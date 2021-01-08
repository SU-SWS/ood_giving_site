import React, { useContext } from "react"
import { searchOverlayOpenContext } from "../../../context/searchOverlayStatusProvider"

const OodMegaMenuSearchButton = props => {
  const { toggleSearchOverlay } = useContext(searchOverlayOpenContext)

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
