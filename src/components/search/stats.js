import React from "react";
import { connectStats } from "react-instantsearch-dom";

const Stats = connectStats(({ nbHits }) => (
  <p className="search-stats">
    <strong>{nbHits}</strong>&nbsp;{nbHits !== 1 ? "results" : "result"} found:
  </p>
));

export default Stats;
