import React, { useEffect, useState } from "react"
import { useLocation } from "@reach/router"
import qs from "query-string"
import algoliasearch from "algoliasearch/lite"
import {
  InstantSearch,
  connectHits,
  connectSearchBox,
} from "react-instantsearch-dom"

const searchClient = algoliasearch(
  process.env.GATSBY_ALGOLIA_APP_ID,
  process.env.GATSBY_ALGOLIA_SEARCH_API_KEY
)

const SearchResults = props => {
  const [initialTerm, setInitialTerm] = useState("")
  const { search } = useLocation()

  useEffect(() => {
    const params = qs.parse(search)

    if (params.term) {
      setInitialTerm(params.term)
    }
  }, [search])

  return (
    <InstantSearch searchClient={searchClient} indexName="Giving to Stanford">
      <SearchBox initialTerm={initialTerm} />
      <Hits {...props} />
    </InstantSearch>
  )
}
export default SearchResults

const SearchBox = props => {
  const AlgoliaSearchBox = connectSearchBox(({ refine }) => {
    const [value, setValue] = useState(props.initialTerm)

    useEffect(() => {
      if (value) refine(value)
    }, [value])

    return (
      <input
        type="search"
        value={value}
        onChange={event => setValue(event.currentTarget.value)}
      />
    )
  })

  return <AlgoliaSearchBox />
}

const Hits = props => {
  const AlgoliaHits = connectHits(({ hits }) => {
    if (!hits.length) {
      return <div className="error">{props.blok.noResultsErrorTitle}</div>
    }

    return (
      <div>
        {hits.map(hit => (
          <div key={hit.objectID}>{JSON.stringify(hit)}</div>
        ))}
      </div>
    )
  })

  return <AlgoliaHits />
}
