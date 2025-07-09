import { useCallback, useMemo } from 'react';
import { usePagination } from 'react-instantsearch';
import * as styles from './Search.styles';
import Link from 'next/link';

export const SearchPagination = () => {
  const {
    pages,
    nbPages,
    currentRefinement,
    isFirstPage,
    isLastPage,
    canRefine,
    refine,
    createURL,
  } = usePagination({ padding: 3 });

  const currentPage = useMemo(() => currentRefinement + 1, [currentRefinement]);
  const showSkipToFirst = useMemo(
    () => nbPages > 7 && currentPage > 4,
    [nbPages, currentPage],
  );
  const showSkipToLast = useMemo(
    () => nbPages > 7 && currentPage < nbPages - 3,
    [nbPages, currentPage],
  );

  const scrollToHeading = useCallback(() => {
    const reduceMotion = !!window.matchMedia('(prefers-reduced-motion: reduce)')
      ?.matches;

    setTimeout(() => {
      const heading = document.getElementById('search-results-header');

      if (heading) {
        heading.focus({ preventScroll: true });
        heading.scrollIntoView({
          block: 'start',
          behavior: reduceMotion ? 'instant' : 'smooth',
        });
      }
    }, 150);
  }, []);

  const handlePageSelect = useCallback((nextPage: number) => {
    refine(nextPage);
    scrollToHeading();
  }, [refine, scrollToHeading]);

  if (!canRefine) {
    return null;
  }

  return (
    <nav aria-label="search pagination">
      <ul className={styles.pageList}>
        <li className={styles.pageListItem} aria-hidden={isFirstPage}>
          {isFirstPage ? (
            <span aria-hidden className={styles.directionCta()}>
              Prev<span className="hidden md:inline">ious</span>
            </span>
          ) : (
            <Link
              href={createURL(currentRefinement - 1)}
              onClick={(e) => {
                e.preventDefault();
                handlePageSelect(currentRefinement - 1);
              }}
              aria-label="Previous page"
              className={styles.directionCta({ isShown: true })}
            >
              Prev<span className="hidden md:inline">ious</span>
            </Link>
          )}
        </li>

        {pages.map((r, i) => {
          let refinement = r;
          let page = refinement + 1;

          if ((showSkipToFirst && i === 1) || (showSkipToLast && i === 5)) {
            return (
              <li key={r} className={styles.pageListItem}>
                <span className={styles.pageEllipsis}>&hellip;</span>
              </li>
            );
          }

          if (showSkipToFirst && i === 0) {
            refinement = 0;
            page = 1;
          } else if (showSkipToLast && i === 6) {
            refinement = nbPages - 1;
            page = nbPages;
          }

          return (
            <li key={r} className={styles.pageListItem}>
              <Link
                href={createURL(refinement)}
                onClick={(e) => {
                  e.preventDefault();
                  handlePageSelect(refinement);
                }}
                aria-label={
                  nbPages === page ? `Last page, page ${page}` : `Page ${page}`
                }
                aria-current={
                  currentRefinement === refinement ? 'page' : undefined
                }
                className={styles.pageCta({
                  isActive: currentRefinement === refinement,
                })}
              >
                {page}
              </Link>
            </li>
          );
        })}

        <li className={styles.pageListItem} aria-hidden={isLastPage}>
          {isLastPage ? (
            <span aria-hidden className={styles.directionCta()}>
              Next
            </span>
          ) : (
            <Link
              href={createURL(currentRefinement + 1)}
              onClick={(e) => {
                e.preventDefault();
                handlePageSelect(currentRefinement + 1);
              }}
              aria-label="Next page"
              className={styles.directionCta({ isShown: true })}
            >
              Next
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};
