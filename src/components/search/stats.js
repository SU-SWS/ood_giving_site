import React from "react"
import { connectStats } from "react-instantsearch-dom"

const Stats = connectStats(({ nbHits, processingTimeMS }) => (
  <div className="search-stats">
    <strong>{nbHits}</strong>&nbsp;results found in {processingTimeMS}ms
  </div>
))

export default Stats
