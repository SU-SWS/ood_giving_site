import { Link } from "gatsby"
import React from "react"
import { connectHits } from "react-instantsearch-dom"
import Stats from "./stats"

const Hits = props => {
  const AlgoliaHits = connectHits(({ hits }) => (
    <div className="search-hits">
      {!hits.length && <div>{props.blok.noResultsErrorTitle}</div>}

      {hits.length > 0 && <Stats />}

      {hits.map(hit => (
        <div className="search-hits-item" key={hit.objectID}>
          <Link to={`/${hit.slug}`}>{hit.title}</Link>
        </div>
      ))}
    </div>
  ))

  return <AlgoliaHits />
}

export default Hits
