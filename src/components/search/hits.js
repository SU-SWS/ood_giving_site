import React from "react"
import { connectHits } from "react-instantsearch-dom"
import Stats from "./stats"
import SbLink from "../partials/sbLink"
import Pagination from "./pagination"

const Hits = props => {
  const AlgoliaHits = connectHits(({ hits }) => (
    <div className="search-hits">
      {!hits.length && (
        <div className="search-hits-no-hits">
          <h2 className="search-hits-no-hits-title">
            {props.blok.noResultsErrorTitle}
          </h2>
          <p className="search-hits-no-hits-text">
            {props.blok.noResultsErrorText}
          </p>
        </div>
      )}

      {hits.length > 0 && <Stats />}

      {hits.map(hit => (
        <article className="search-hits-item" key={hit.objectID}>
          <h2>
            <SbLink link={{ cached_url: `/${hit.slug}` }}>{hit.title}</SbLink>
          </h2>
          <p>{hit.intro || hit.teaser || hit.description}</p>
        </article>
      ))}

      <Pagination initialPage={props.initialPage} />
    </div>
  ))

  return <AlgoliaHits />
}

export default Hits
