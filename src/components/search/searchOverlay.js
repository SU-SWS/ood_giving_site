import React, { useContext, useEffect, useRef, useState } from "react"
import { SearchOverlayOpenContext } from "../../context/searchOverlayStatusProvider"
import { navigate } from "gatsby"
import SearchBox from "./searchBox"
import UseEscape from "../../hooks/useEscape"

const SearchOverlay = () => {
  const { isOpen, toggleSearchOverlay } = useContext(SearchOverlayOpenContext)
  const [term, setTerm] = useState("")
  const [isEmptyErrorVisible, setIsEmptyErrorVisible] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    if (isOpen && inputRef.current) {
      // when the search overlay opens, immediately give focus to the input
      setTimeout(() => inputRef.current.focus(), 100)
    }
  }, [isOpen, inputRef])

  const handleChange = value => {
    setTerm(value)

    if (isEmptyErrorVisible) {
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

  useRef()

  UseEscape(() => isOpen && toggleSearchOverlay())

  return (
    <div id="search-overlay" className={isOpen ? "visible" : "hidden"}>
      {/* {isOpen && ( */}
      <div className="search-container">
        <div className="search-header">
          <span className="search-close-button" onClick={toggleSearchOverlay}>
            Close
            <span className="search-close-x"></span>
          </span>
        </div>
        <div className="search-body">
          <strong className="search-heading">
            Hello, what can we help you find today?
          </strong>
          <SearchBox
            initialTerm={""}
            onChange={handleChange}
            onSubmit={submitTerm}
            ref={inputRef}
          />
        </div>
        {isEmptyErrorVisible && (
          <div className="search-error">
            Error message
            <br />
            Second Line
          </div>
        )}
        <div className="search-footer">
          <div className="search-footer-col">Lorem ipsum</div>
          <div className="search-footer-col">doluit</div>
        </div>
      </div>
      {/* )} */}
    </div>
  )
}
export default SearchOverlay
