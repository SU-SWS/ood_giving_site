/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { useHits, useInstantSearch } from 'react-instantsearch';
import { Skeleton } from '@mui/material';
import { cnb } from 'cnbuilder';
import SearchResultAlumniEvent from './Hits/SearchResultAlumniEvent';
import SearchResultDefault from './Hits/SearchResultDefault';
import { Heading } from '../simple/Heading';
/**
 * Main component
 * @returns Main Search Results
 */
const SearchResults = () => {
  const { results, items } = useHits();
  const { status } = useInstantSearch();
  const isLoading = status === 'loading';
  const isStalled = status === 'stalled';

  // Show loading.
  if (isStalled) {
    return (
      <div>
        <Skeleton variant="rectangular" className="su-rs-mb-1" height={135} />
        <Skeleton variant="rectangular" className="su-rs-my-1" height={135} />
        <Skeleton variant="rectangular" className="su-rs-my-1" height={135} />
        <Skeleton variant="rectangular" className="su-rs-my-1" height={135} />
        <Skeleton variant="rectangular" className="su-rs-my-1" height={135} />
        <Skeleton variant="rectangular" className="su-rs-my-1" height={135} />
        <Skeleton variant="rectangular" className="su-rs-my-1" height={135} />
        <Skeleton variant="rectangular" className="su-rs-my-1" height={135} />
      </div>
    );
  }

  // No Results.
  if (!results || !results.nbHits) {
    return null;
  }

  // Show results.
  return (
    <div
      id="search-results"
      className={cnb({
        'su-opacity-30': isLoading,
      })}
    >
      <Heading
        level={2}
        className="su-text-21 lg:su-mb-40"
        aria-live="polite"
        aria-atomic="true"
        tabIndex={0}
        id="number-search-results"
      >
        <span className="su-font-semibold">{results.nbHits}</span> results:
      </Heading>
      {items.map((result) => {
        switch (result.type) {
          case 'alumni-event': {
            return (
              <SearchResultAlumniEvent
                result={result}
                key={result.objectID}
                className="search-result"
              />
            );
          }
          default: {
            return (
              <SearchResultDefault
                result={result}
                key={result.objectID}
                className="search-result"
              />
            );
          }
        }
      })}
    </div>
  );
};
export default SearchResults;
