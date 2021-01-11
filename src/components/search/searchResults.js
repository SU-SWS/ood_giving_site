import { useLocation } from "@reach/router"
import algoliasearch from "algoliasearch/lite"
import qs from "query-string"
import React, { useEffect, useRef, useState } from "react"
import {
  Configure,
  connectStateResults,
  InstantSearch,
} from "react-instantsearch-dom"
import Hits from "./hits"
import SearchBox from "./searchBox"
import Pagination from "./pagination"

const searchClient = algoliasearch(
  process.env.GATSBY_ALGOLIA_APP_ID,
  process.env.GATSBY_ALGOLIA_SEARCH_API_KEY
)

const StateResults = connectStateResults(({ searchState, children }) => {
  return searchState?.query ? children : "no query - fallback"
})

const SearchResults = props => {
  const [initialTerm, setInitialTerm] = useState("")
  // page is 1-based here, for better readability in the URL query parameter
  const [initialPage, setInitialPage] = useState(1)

  const { search } = useLocation()

  useEffect(() => {
    const params = qs.parse(search)

    if (params.term) {
      setInitialTerm(params.term)
    }

    if (params.page) {
      setInitialPage(parseInt(params.page))
    }
  }, [search])

  const urlParamsSaveTimeout = useRef()

  const handleSearchStateChange = ({ page, query }) => {
    const params = qs.parse(search)

    if (query && (params.term !== query || parseInt(params.page) !== page)) {
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

  return (
    <InstantSearch
      searchClient={searchClient}
      indexName={process.env.GATSBY_ALGOLIA_INDEX_NAME}
      onSearchStateChange={handleSearchStateChange}
    >
      <Configure hitsPerPage={10} />
      <SearchBox
        initialTerm={initialTerm}
        onEmptySearch={() => {
          // TODO: implement some behaviour when user tries to submit an empty search
        }}
      />
      <StateResults>
        <Hits {...props} />
        <Pagination initialPage={initialPage} />
      </StateResults>
    </InstantSearch>
  )
}
export default SearchResults
