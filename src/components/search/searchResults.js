import { useLocation } from "@reach/router"
import algoliasearch from "algoliasearch/lite"
import qs from "query-string"
import React, { useEffect, useRef, useState } from "react"
import {
  Configure,
  connectSearchBox,
  connectStateResults,
  InstantSearch,
} from "react-instantsearch-dom"
import Hits from "./hits"
import Autocomplete from "./autocomplete"

const searchClient = algoliasearch(
  process.env.GATSBY_ALGOLIA_APP_ID,
  process.env.GATSBY_ALGOLIA_SEARCH_API_KEY
)

const VirtualSearchBox = ({ query }) => {
  const AlgoliaVirtualSearchBox = connectSearchBox(
    ({ refine, currentRefinement }) => {
      useEffect(() => {
        if (query !== currentRefinement) refine(query)
      }, [query, currentRefinement, refine])

      return null
    }
  )

  return <AlgoliaVirtualSearchBox />
}
const StateResults = props => {
  const AlgoliaStateResults = connectStateResults(
    ({ searchState, isSearchStalled }) => {
      return (
        <>
          {props.isEmptySearchVisible ? (
            <div className="search-hits-no-hits">
              <strong className="search-hits-no-hits-title">
                {props.blok.emptySearchTitle}
              </strong>
              <p className="search-hits-no-hits-text">
                {props.blok.emptySearchText}
              </p>
            </div>
          ) : !searchState.query ? null : isSearchStalled ? (
            <>Loading... </>
          ) : (
            props.children
          )}
        </>
      )
    }
  )

  return <AlgoliaStateResults />
}

const SearchResults = props => {
  // page is 1-based here, for better readability in the URL query parameter
  const [initialPage, setInitialPage] = useState(1)

  const [query, setQuery] = useState("")
  const [isEmptySearchVisible, setIsEmptySearchVisible] = useState(false)

  const { search } = useLocation()

  useEffect(() => {
    const params = qs.parse(search)

    if (params.page) {
      setInitialPage(parseInt(params.page))
    }
  }, [search])

  const urlParamsSaveTimeout = useRef()

  const handleSearchStateChange = ({ page, query }) => {
    const params = qs.parse(search)

    if (
      query &&
      (params.term !== query ||
        parseInt(params.page) !== page ||
        urlParamsSaveTimeout.current)
    ) {
      clearTimeout(urlParamsSaveTimeout.current)
      urlParamsSaveTimeout.current = setTimeout(() => {
        window.history.replaceState(
          null,
          null,
          qs.stringifyUrl({
            url: window.location.href,
            query: { page, term: query },
          })
        )
      }, 400)
    } else if (!query && (params.term || params.page)) {
      clearTimeout(urlParamsSaveTimeout.current)
      urlParamsSaveTimeout.current = setTimeout(() => {
        window.history.replaceState(
          null,
          null,
          qs.stringifyUrl({
            url: window.location.href.replace(window.location.search, ""),
          })
        )
      }, 400)
    }
  }

  const handleSubmit = value => {
    setQuery(value)
    setIsEmptySearchVisible(!value)
  }
  const handleSuggestionCleared = () => {
    setQuery("")
    setIsEmptySearchVisible(false)
  }

  return (
    <>
      <InstantSearch
        searchClient={searchClient}
        indexName={process.env.GATSBY_ALGOLIA_SUGGESTIONS_INDEX_NAME}
      >
        <Autocomplete
          onSubmit={handleSubmit}
          onSuggestionCleared={handleSuggestionCleared}
        />
        <Configure hitsPerPage={parseInt(props.blok.suggestionsAmount) ?? 10} />
      </InstantSearch>

      <InstantSearch
        searchClient={searchClient}
        indexName={process.env.GATSBY_ALGOLIA_INDEX_NAME}
        onSearchStateChange={handleSearchStateChange}
      >
        <VirtualSearchBox query={query} />
        <Configure hitsPerPage={10} />
        <StateResults {...props} isEmptySearchVisible={isEmptySearchVisible}>
          <Hits {...props} initialPage={initialPage} />
        </StateResults>
      </InstantSearch>
    </>
  )
}
export default SearchResults
