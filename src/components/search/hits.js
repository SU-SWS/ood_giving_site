import { Link } from "gatsby"
import React from "react"
import { connectHits } from "react-instantsearch-dom"
import Stats from "./stats"
import Pagination from "./pagination"

const Hits = props => {
  const AlgoliaHits = connectHits(({ hits }) => (
    <div className="search-hits" id="search-hits">
      {!hits.length && (
        <div className="search-hits-no-hits">
          <strong className="search-hits-no-hits-title">
            {props.blok.noResultsErrorTitle}
          </strong>
          <p className="search-hits-no-hits-text">
            {props.blok.noResultsErrorText}
          </p>
        </div>
      )}

      {hits.length > 0 && <Stats />}

      {hits.map(hit => (
        <article className="search-hits-item" key={hit.objectID}>
          <Link to={`/${hit.slug}`}>{hit.title}</Link>
          <div>{hit.intro || hit.teaser || hit.description}</div>
        </article>
      ))}

      <Pagination initialPage={props.initialPage} />
    </div>
  ))

  return <AlgoliaHits />
}

export default Hits
