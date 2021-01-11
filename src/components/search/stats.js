import React from "react"
import { connectStats } from "react-instantsearch-dom"

const Stats = connectStats(({ nbHits }) => (
  <div className="search-stats">
    <strong>{nbHits}</strong>&nbsp;results found:
  </div>
))

export default Stats
