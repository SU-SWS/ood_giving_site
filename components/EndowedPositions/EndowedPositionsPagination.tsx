'use client';
import { useCallback } from 'react';
import { cnb } from 'cnbuilder';
import Link from 'next/link';

type EndowedPositionsPaginationProps = {
  currentPage: number;
  totalPages: number;
  focusOnPageChangeId?: string;
};

export const EndowedPositionsPagination = ({
  currentPage,
  totalPages,
  focusOnPageChangeId,
}: EndowedPositionsPaginationProps) => {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;
  const showLeftBreak = totalPages > 7 && currentPage > 4;
  const showRightBreak = totalPages > 7 && currentPage < totalPages - 3;
  const shownPages = totalPages <= 7
    ? Array.from({ length: totalPages }, (_, i) => i + 1)
    : Array.from({ length: 7 }, (_, i) => {
      // First option is always 1
      if (i === 0) {
        return 1;
      }

      // Last option is always the last page
      if (i === 6) {
        return totalPages;
      }

      // Show an ellipsis when needed
      if ((i === 1 && showLeftBreak) || (i === 5 && showRightBreak)) {
        return 'break';
      }

      // We're close to the start
      if (!showLeftBreak) {
        return i + 1;
      }

      // We're close to the end
      if (!showRightBreak && i > 1) {
        return totalPages - (6 - i);
      }

      // We're not close to either start or end
      if (showLeftBreak && showRightBreak && i > 1 && i < 5) {
        return currentPage + (i - 3);
      }

      // This should never happen...
      return i + 1;
    });

  const handlePageChange = useCallback(() => {
    const el = document.getElementById(focusOnPageChangeId);
    if (el) {
      el.focus();
    }
  }, [focusOnPageChangeId]);

  return (
    <nav aria-label="Endowed positions pagination" className="flex justify-center rs-mt-4">
      <ol className="flex list-none m-0 p-0 gap-4 sm:gap-12 md:gap-16 xl:gap-24 text-28">
        <li className="flex items-center justify-center mb-0 uppercase">
          {isFirstPage ? (
            <span aria-hidden className="invisible">
              Previous
            </span>
          ) : (
            <Link
              href={`?page=${currentPage - 1}`}
              aria-label="Previous page"
              className="flex items-center justify-center no-underline border-b-4 border-b-transparent hocus:border-b-digital-blue text-16 lg:text-18 xl:text-20 transition-colors"
              scroll={false}
              onClick={handlePageChange}
            >
              Prev<span className="hidden md:inline">ious</span>
            </Link>
          )}
        </li>

        {shownPages.map((page, i) => {
          if (page === 'break') {
            return (
              <li key={`ellipsis-${i}`} className="flex items-center justify-center mb-0 w-16 md:w-30 text-16 md:text-18 xl:text-20">
                &hellip;
              </li>
            );
          }

          return (
            <li key={page} className="flex items-center justify-center mb-0">
              <Link
                href={`?page=${page}`}
                scroll={false}
                onClick={handlePageChange}
                aria-label={i === shownPages.length - 1 ? `Last page, page ${page}` : `Page ${page}`}
                aria-current={page === currentPage ? 'page' : undefined}
                className={cnb(
                  'flex items-center justify-center w-24 md:w-30 text-18 sm:text-20 lg:text-22 xl:text-24 font-serif no-underline border-b-4 hocus:border-b-digital-blue transition-colors',
                  {
                    ['border-b-transparent']: page !== currentPage,
                    ['text-black border-b-black hocus:border-b-black hocus:text-black']: page === currentPage,
                  },
                )}
              >
                {page}
              </Link>
            </li>
          );
        })}
        <li className="flex items-center justify-center mb-0 uppercase">
          {isLastPage ? (
            <span aria-hidden className="invisible">
              Next
            </span>
          ) : (
            <Link
              href={`?page=${currentPage + 1}`}
              aria-label="Next page"
              scroll={false}
              onClick={handlePageChange}
              className="flex items-center justify-center no-underline border-b-4 border-b-transparent hocus:border-b-digital-blue text-16 lg:text-18 xl:text-20 transition-colors"
            >
              Next
            </Link>
          )}
        </li>
      </ol>
    </nav>
  );
};
