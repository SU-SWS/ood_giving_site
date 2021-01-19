import React, { useContext, useEffect, useRef, useState } from "react"
import { SearchOverlayOpenContext } from "../../context/searchOverlayStatusProvider"
import { navigate } from "gatsby"
import SearchBox from "./searchBox"
import UseEscape from "../../hooks/useEscape"
import UseSearchOverlayData from "../../hooks/useSearchOverlayData"
import { LocationProvider } from "@reach/router"
import CtaLink from "../simple/ctaLink"

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

  const {
    introduction,
    categoriesLeftHeadline,
    categoriesLeftBox,
    categoriesRightHeadline,
    categoriesRightBox,
    categoriesHeadline,
    emptySearchMessage,
  } = UseSearchOverlayData()

  return (
    <div id="search-overlay" className={isOpen ? "visible" : "hidden"}>
      <div className="search-container">
        <div className="search-header">
          <button className="search-close-button" onClick={toggleSearchOverlay}>
            Close
            <span className="search-close-x"></span>
          </button>
        </div>
        <div className="search-body">
          <strong className="search-heading">{introduction}</strong>
          <SearchBox
            initialTerm={""}
            onChange={handleChange}
            onSubmit={submitTerm}
            ref={inputRef}
          />
        </div>
        <div
          className={`search-error ${
            isEmptyErrorVisible ? "search-error--visible" : ""
          }`}
        >
          {emptySearchMessage}
        </div>
        <div className="search-footer">
          <strong className="search-categories-headline">
            {categoriesHeadline}
          </strong>
          <div className="search-footer-cols">
            <LocationProvider>
              <div className="search-footer-col">
                <span className="search-category-title">
                  {categoriesLeftHeadline}
                </span>
                <ul className="search-categories">
                  {categoriesLeftBox.map((link, idx) => (
                    <li
                      className="search-category-link"
                      key={idx}
                      onClick={toggleSearchOverlay}
                    >
                      <CtaLink blok={link} />
                    </li>
                  ))}
                </ul>
              </div>
              <div className="search-footer-col">
                <span className="search-category-title">
                  {categoriesRightHeadline}
                </span>
                <ul className="search-categories">
                  {categoriesRightBox.map((link, idx) => (
                    <li
                      className="search-category-link"
                      key={idx}
                      onClick={toggleSearchOverlay}
                    >
                      <CtaLink blok={link} />
                    </li>
                  ))}
                </ul>
              </div>
            </LocationProvider>
          </div>
        </div>
      </div>
    </div>
  )
}
export default SearchOverlay
