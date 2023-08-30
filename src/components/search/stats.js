import React from 'react';
import { connectStats } from 'react-instantsearch-dom';

const Stats = connectStats(({ nbHits }) => (
  <p className="search-stats" aria-live="polite" aria-atomic>
    <strong>{nbHits}</strong>
    {nbHits !== 1 ? ' results' : ' result'} found:
  </p>
));

export default Stats;
