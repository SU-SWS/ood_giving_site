import React, { useEffect, useMemo } from "react"
import { connectPagination } from "react-instantsearch-dom"

const Pagination = ({ initialPage }) => {
  const AlgoliaPagination = useMemo(
    connectPagination(({ nbPages, currentRefinement: currentPage, refine }) => {
      useEffect(() => {
        if (initialPage && initialPage !== currentPage) refine(initialPage)
      }, [])

      const isPreviousVisible = currentPage > 1
      const isNextVisible = currentPage < nbPages
      const nextPages = isNextVisible
        ? currentPage + 1 < nbPages
          ? [currentPage + 1, currentPage + 2]
          : [currentPage + 1]
        : []
      const previousPages = isPreviousVisible
        ? currentPage - 1 > 1
          ? [currentPage - 2, currentPage - 1]
          : [currentPage - 1]
        : []
      const isFirstPageVisible = currentPage > 3

      const isLastPageVisible = nextPages[nextPages.length - 1] < nbPages

      const handlePageChange = (newPage, $event) => {
        $event.preventDefault()
        refine(newPage)
        document.querySelector(".search-hits")?.scrollIntoView()
      }

      return (
        <nav role="navigation" aria-label="Pagination Navigation">
          <ul className="search-pagination">
            {isPreviousVisible && (
              <li
                className="search-pagination-item search-pagination-item--text"
                tabIndex={0}
              >
                <a
                  onClick={$event => handlePageChange(currentPage - 1, $event)}
                  href={`/search-results?page=${currentPage - 1}`}
                  aria-label={`Go to previous page`}
                >
                  Previous
                </a>
              </li>
            )}
            {isFirstPageVisible && (
              <>
                <li
                  role="button"
                  className="search-pagination-item search-pagination-item--mobile-hidden"
                >
                  <a
                    onClick={$event => handlePageChange(1, $event)}
                    href={`/search-results?page=1`}
                    aria-label={`Go to page 1`}
                  >
                    1
                  </a>
                </li>
                <li className="search-pagination-item search-pagination-item--placeholder search-pagination-item--mobile-hidden">
                  ...
                </li>
              </>
            )}
            {previousPages.map(page => {
              return (
                <li className="search-pagination-item" key={page}>
                  <a
                    onClick={$event => handlePageChange(page, $event)}
                    href={`/search-results?page=${page}`}
                    aria-label={`Go to page ${page}`}
                  >
                    {page}
                  </a>
                </li>
              )
            })}
            <li
              className="search-pagination-item search-pagination-item--current"
              aria-label={`Page ${currentPage}, current page`}
              aria-current="true"
            >
              {currentPage}
            </li>
            {nextPages.map(page => {
              return (
                <li key={page} className="search-pagination-item">
                  <a
                    onClick={$event => handlePageChange(page, $event)}
                    href={`/search-results?page=${page}`}
                    aria-label={`Go to page ${page}`}
                  >
                    {page}
                  </a>
                </li>
              )
            })}
            {isLastPageVisible && (
              <>
                <li className="search-pagination-item search-pagination-item--placeholder search-pagination-item--mobile-hidden">
                  ...
                </li>
                <li className="search-pagination-item search-pagination-item--mobile-hidden">
                  <a
                    onClick={$event => handlePageChange(nbPages, $event)}
                    href={`/search-results?page=${nbPages}`}
                    aria-label={`Go to page ${nbPages}`}
                  >
                    {nbPages}
                  </a>
                </li>
              </>
            )}
            {isNextVisible && (
              <li className="search-pagination-item search-pagination-item--text">
                <a
                  onClick={$event => handlePageChange(currentPage + 1, $event)}
                  href={`/search-results?page=${currentPage + 1}`}
                  aria-label={`Go to next page`}
                >
                  Next
                </a>
              </li>
            )}
          </ul>
        </nav>
      )
    }),
    []
  )

  return AlgoliaPagination
}

export default Pagination
