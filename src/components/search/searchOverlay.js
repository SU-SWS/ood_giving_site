import React, { useContext, useEffect, useRef, useState } from "react"
import { SearchOverlayOpenContext } from "../../context/searchOverlayStatusProvider"
import { navigate } from "gatsby"
import UseEscape from "../../hooks/useEscape"
import UseSearchOverlayData from "../../hooks/useSearchOverlayData"
import { LocationProvider } from "@reach/router"
import CtaLink from "../simple/ctaLink"
import { config } from "../../utilities/config"
import UseFocusTrap from "../../hooks/useFocusTrap"
import { searchClient } from "./searchResults"
import { Configure, InstantSearch } from "react-instantsearch-dom"
import Autocomplete from "./autocomplete"

const SearchOverlay = () => {
  const { isOpen, closeSearchOverlay } = useContext(SearchOverlayOpenContext)
  const [isEmptyErrorVisible, setIsEmptyErrorVisible] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    if (isOpen && inputRef.current) {
      // when the search overlay opens, immediately give focus to the input
      setTimeout(() => inputRef.current.focus(), 100)
    }
  }, [isOpen, inputRef])

  const submitTerm = term => {
    if (term.length > 0) {
      navigate(`${config.basePath}search-results?term=${term}`)
      closeSearchOverlay()
    } else {
      setIsEmptyErrorVisible(true)
    }
  }

  const handleSuggestionCleared = () => {
    setIsEmptyErrorVisible(false)
  }

  UseEscape(() => isOpen && closeSearchOverlay())

  const {
    introduction,
    categoriesLeftHeadline,
    categoriesLeftBox,
    categoriesRightHeadline,
    categoriesRightBox,
    categoriesHeadline,
    emptySearchMessage,
    suggestionsAmount,
  } = UseSearchOverlayData()

  // collect refs of both the first and last tabbable element of the overlay
  // we need these refs to trap the focus inside the overlay
  const firstTabbableRef = useRef()
  const lastTabbableRef = useRef()
  UseFocusTrap(firstTabbableRef, lastTabbableRef, isOpen)

  return (
    <div className={`search-overlay ${isOpen ? "visible" : "hidden"}`}>
      <LocationProvider>
        <div className="search-container">
          <div className="search-header">
            <button
              className="search-close-button"
              onClick={closeSearchOverlay}
              ref={firstTabbableRef}
            >
              Close
              <span className="search-close-x"></span>
            </button>
          </div>
          <div className="search-body">
            <strong className="search-heading">{introduction}</strong>
            <InstantSearch
              searchClient={searchClient}
              indexName={process.env.GATSBY_ALGOLIA_SUGGESTIONS_INDEX_NAME}
            >
              <Autocomplete
                onSubmit={submitTerm}
                onSuggestionCleared={handleSuggestionCleared}
                ref={inputRef}
              />
              <Configure hitsPerPage={parseInt(suggestionsAmount) ?? 10} />
            </InstantSearch>
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
              <div className="search-footer-col">
                <span className="search-category-title">
                  {categoriesLeftHeadline}
                </span>
                <ul className="search-categories">
                  {categoriesLeftBox.map((link, idx) => (
                    <li
                      className="search-category-link"
                      key={idx}
                      onClick={closeSearchOverlay}
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
                      onClick={closeSearchOverlay}
                    >
                      <CtaLink
                        {...(idx + 1 === categoriesRightBox.length
                          ? { ref: lastTabbableRef }
                          : {})}
                        blok={link}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </LocationProvider>
    </div>
  )
}
export default SearchOverlay
