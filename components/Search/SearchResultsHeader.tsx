'use client';

import { useMemo } from 'react';
import { useStats } from 'react-instantsearch';
import { Heading } from '@/components/Typography';

export const SearchResultsHeader = () => {
  const {
    nbHits,
    hitsPerPage,
    nbPages,
    page,
    areHitsSorted,
    nbSortedHits,
  } = useStats();

  const numHits = useMemo(
    () => (areHitsSorted ? nbSortedHits : nbHits),
    [areHitsSorted, nbHits, nbSortedHits],
  );

  const lastPageHits = useMemo(
    () => numHits % hitsPerPage,
    [numHits, hitsPerPage],
  );

  const isShowFirstPage = useMemo(() => page === 0, [page]);
  const isShowingLastPage = useMemo(
    () => nbPages === page + 1,
    [nbPages, page],
  );

  const firstPageResult = useMemo(
    () => (isShowFirstPage ? 1 : page * hitsPerPage + 1),
    [isShowFirstPage, page, hitsPerPage],
  );

  const lastPageResult = useMemo(
    () => (isShowingLastPage
      ? firstPageResult + lastPageHits - 1
      : firstPageResult + hitsPerPage - 1),
    [isShowingLastPage, firstPageResult, lastPageHits, hitsPerPage],
  );

  const countDisplay = useMemo(
    () => `${numHits > 1 ? 'results' : 'result'} found:`,
    [numHits],
  );
  const pageDisplay = useMemo(
    () => ` showing ${firstPageResult} to ${lastPageResult}`,
    [firstPageResult, lastPageResult],
  );

  if (!numHits) {
    return null;
  }

  return (
    <Heading
      as="h2"
      font="sans"
      weight="normal"
      aria-live="polite"
      aria-atomic
      className="text-18 md:text-20 scroll-mt-140"
      id="search-results-header"
      tabIndex={-1}
    >
      <span className="font-bold">{nbHits}</span> {countDisplay}
      <span className="sr-only">{pageDisplay}</span>
    </Heading>
  );
};
