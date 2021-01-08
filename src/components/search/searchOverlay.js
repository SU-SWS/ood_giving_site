import React, { useContext, useEffect, useRef, useState } from "react"
import "./searchOverlay.scss"
import { SearchOverlayOpenContext } from "../../context/searchOverlayStatusProvider"
import { navigate } from "gatsby"

const SearchOverlay = () => {
  const { isOpen, toggleSearchOverlay } = useContext(SearchOverlayOpenContext)
  const [term, setTerm] = useState("")
  const [isEmptyErrorVisible, setIsEmptyErrorVisible] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    if (isOpen && inputRef) {
      // when the search overlay opens, immediately give focus to the input
      inputRef.current.focus()
    }
  }, [isOpen, inputRef])

  const handleKeyDown = event => {
    if (event.key === "Enter") {
      submitTerm()
    } else if (isEmptyErrorVisible) {
      setIsEmptyErrorVisible(false)
    }
  }

  const submitTerm = () => {
    if (term.length > 0) {
      navigate(`/search-results?term=${term}`)
      toggleSearchOverlay()
      setTerm("")
    } else {
      setIsEmptyErrorVisible(true)
    }
  }

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
            value={term}
            onChange={event => setTerm(event.target.value)}
            onKeyDown={handleKeyDown}
          />
          <span className="search-icon" onClick={submitTerm}>
            Icon
          </span>
        </div>
        {isEmptyErrorVisible && (
          <div className="search-error">
            Error message
            <br />
            Second Line
          </div>
        )}
        <div className="search-footer">
          <div className="search-footer-col">eins</div>
          <div className="search-footer-col">zwei</div>
        </div>
      </div>
    </div>
  )
}
export default SearchOverlay
