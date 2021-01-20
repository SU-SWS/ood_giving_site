import React, { useContext } from "react"
import { SearchOverlayOpenContext } from "../../context/searchOverlayStatusProvider"

const OoodHeaderSearchButton = () => {
  const { toggleSearchOverlay } = useContext(SearchOverlayOpenContext)

  return (
    <button
      className="ood-header-search-button"
      onClick={toggleSearchOverlay}
      title="Search site"
    >
      <span
        className="ood-header-search-button-icon"
        aria-label="Search icon"
      />
    </button>
  )
}

export default OoodHeaderSearchButton
