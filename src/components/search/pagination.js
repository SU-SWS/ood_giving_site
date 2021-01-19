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

      const handlePageChange = newPage => {
        refine(newPage)
        document.querySelector("#search-hits")?.scrollIntoView()
      }

      return (
        <ul className="search-pagination">
          {isPreviousVisible && (
            <li
              className="search-pagination-item search-pagination-item--text"
              onClick={() => handlePageChange(currentPage - 1)}
              role="button"
              title={`Go to previous page`}
              tabIndex={0}
            >
              Previous
            </li>
          )}
          {isFirstPageVisible && (
            <>
              <li
                onClick={() => handlePageChange(1)}
                role="button"
                title={`Go to page 1`}
                tabIndex={0}
                className="search-pagination-item search-pagination-item--mobile-hidden"
              >
                1
              </li>
              <li className="search-pagination-item search-pagination-item--placeholder search-pagination-item--mobile-hidden">
                ...
              </li>
            </>
          )}
          {previousPages.map(page => {
            return (
              <li
                className="search-pagination-item"
                key={page}
                onClick={() => handlePageChange(page)}
                role="button"
                title={`Go to page ${page}`}
                tabIndex={0}
              >
                {page}
              </li>
            )
          })}
          <li className="search-pagination-item search-pagination-item--current">
            {currentPage}
          </li>
          {nextPages.map(page => {
            return (
              <li
                key={page}
                onClick={() => handlePageChange(page)}
                role="button"
                title={`Go to page ${page}`}
                tabIndex={0}
                className="search-pagination-item"
              >
                {page}
              </li>
            )
          })}
          {isLastPageVisible && (
            <>
              <li className="search-pagination-item search-pagination-item--placeholder search-pagination-item--mobile-hidden">
                ...
              </li>
              <li
                onClick={() => handlePageChange(nbPages)}
                role="button"
                title={`Go to page ${nbPages}`}
                tabIndex={0}
                className="search-pagination-item search-pagination-item--mobile-hidden"
              >
                {nbPages}
              </li>
            </>
          )}
          {isNextVisible && (
            <li
              className="search-pagination-item search-pagination-item--text"
              onClick={() => handlePageChange(currentPage + 1)}
              role="button"
              title={`Go to next page`}
              tabIndex={0}
            >
              Next
            </li>
          )}
        </ul>
      )
    }),
    []
  )

  return AlgoliaPagination
}

export default Pagination