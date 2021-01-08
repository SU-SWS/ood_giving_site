import React, { useContext, useEffect, useRef } from "react"
import "./searchOverlay.scss"
import { SearchOverlayOpenContext } from "../../context/searchOverlayStatusProvider"

const SearchOverlay = () => {
  const { isOpen, toggleSearchOverlay } = useContext(SearchOverlayOpenContext)
  const inputRef = useRef(null)

  useEffect(() => {
    if (isOpen && inputRef) {
      // when the search overlay opens, immediately give focus to the input
      inputRef.current.focus()
    }
  }, [isOpen, inputRef])

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
            ref={inputRef}
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
