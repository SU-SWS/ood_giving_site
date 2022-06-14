import React, { useEffect, useState } from 'react';
import { Link } from 'gatsby';
import cx from 'classnames';

const TOTAL_MOBILE_PAGES = 5;
const MOBILE_WIDTH = 1000;

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return windowSize;
};

const TextPagination = ({ currentPage, next }) => {
  const text = next ? 'next' : 'previous';
  const url = next ? `?page=${currentPage + 1}` : `?page=${currentPage - 1}`;
  return (
    <li className="search-pagination-item search-pagination-item--text">
      <Link aria-label={`Go to ${text} page`} to={url}>
        {text}
      </Link>
    </li>
  );
};

const EndowedPositionsPagination = ({ currentPage, pagesArray }) => {
  const size = useWindowSize();
  const isMobile = size.width < MOBILE_WIDTH;
  const pageOffset = currentPage - 1;
  const lastPageToDisplay = pageOffset + TOTAL_MOBILE_PAGES;
  const mobileDisplayArray = pagesArray.map((item) => {
    if (item < lastPageToDisplay && item >= pageOffset) {
      return item;
    } else {
      return null;
    }
  });

  return (
    <ol className="endowed-positions__paginate search-pagination">
      {isMobile && currentPage !== 1 && (
        <TextPagination currentPage={currentPage} />
      )}
      {pagesArray.map((item) => {
        const ariaCurrent =
          item + 1 === currentPage ? { 'aria-current': true } : {};
        return (
          <li
            className={cx('search-pagination-item', {
              ['search-pagination-item--current']: item + 1 === currentPage,
              ['endowed-positions__paginate--mobile-hidden']:
                mobileDisplayArray.indexOf(item) === -1 && isMobile,
            })}
            key={item + 1}
            {...ariaCurrent}
          >
            {item + 1 === currentPage ? (
              <><span className="sr-only">page </span>{item + 1}</>
            ) : (
              <Link
                aria-label={`to page ${item + 1}`}
                key={item}
                to={`?page=${item + 1}`}
              >
                {item + 1}
              </Link>
            )}
          </li>
        );
      })}
      {isMobile && currentPage !== pagesArray.length && (
        <TextPagination currentPage={currentPage} next />
      )}
    </ol>
  );
};

export default EndowedPositionsPagination;
