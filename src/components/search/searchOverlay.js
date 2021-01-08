import React, { useContext } from "react"
import "./searchOverlay.scss"
import { searchOverlayOpenContext } from "../../context/searchOverlayStatusProvider"

const SearchOverlay = () => {
  const { isOpen, toggleSearchOverlay } = useContext(searchOverlayOpenContext)
  return (
    <div
      id="search-overlay"
      style={{ display: `${isOpen ? "block" : "none"}` }}
    >
      <div className="search-container">
        <div className="search-header">
          <span className="search-close-button" onClick={toggleSearchOverlay}>
            Close
            <span className="search-close-x"></span>
          </span>
        </div>
        <div className="search-body">
          <input
            type="input"
            className="search-field"
            placeholder="  Search"
            name="search-field"
            id="search-field"
            required
          />
          <span className="search-icon">Icon</span>
        </div>
        <div className="search-error">
          Error message
          <br />
          Second Line
        </div>
        <div className="search-footer">
          <div className="search-footer-col">eins</div>
          <div className="search-footer-col">zwei</div>
        </div>
      </div>
    </div>
  )
}
export default SearchOverlay
